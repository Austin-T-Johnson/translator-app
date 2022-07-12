import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-segments';
import * as animationData from '../assets/lottie_animations/egg.json';
import getEasterEggTranslation from '../helpers/getTranslation';
import video from '../assets/videos/question.webm';

const initValue = {
    input: '',
    selectedLang: ''
};

const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

function Form() {
    const [values, setValues] = useState(initValue)
    const [translation, setTranslation] = useState("")
    const [language, setLanguage] = useState("")
    const [hasEasterEgg, setHasEasterEgg] = useState(false)
    const [isStopped, setIsStopped] = useState(true);
    const [goto, setGoto] = useState();
    const [voiceCode, setVoiceCode] = useState();
    const [audioSrc, setaudioSrc] = useState()

    // useEffect(() => {
    //     elementRef.current.play();

    // }, [audioSrc])

    const [sequence, setSequence] = useState({
        segments: [108, 138],
        forceFlag: true
    });
    const elementRef = useRef();

    const onChange = evt => {
        setValues({ ...values, input: evt.target.value })
    }

    const onSubmit = evt => {
        evt.preventDefault();
        getTranslation();
    }

    const selectLanguage = (e) => {
        setValues({ ...values, selectedLang: e.target.value });
    }

    const setEasterEgg = () => {
        setIsStopped(false);
        setHasEasterEgg(true)
    }

    const animate = () => {
        setGoto({
            value: 114,
            isFrame: true
        })
        setIsStopped(false);
        setEasterEgg();
    }

    const getTranslation = async () => {
        const options = {
            method: 'GET',
            url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
            params: { langpair: `en|${values.selectedLang}`, q: values.input },
            headers: {
                'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com',
                'X-RapidAPI-Key': '85f2f02d04msh465340af7983dbep158beejsnc533b3ca83f5'
            }
        };

        if (values.selectedLang === 'en') {
            let translation = await getTextToVoice(getEasterEggTranslation());
            setTranslation("?????")
            setaudioSrc(translation.data.audio_file);

        } else {
            axios.request(options).then(async (response) => {
                setTranslation(response.data.responseData.translatedText);
                let translation = await getTextToVoice(response.data.responseData.translatedText);
                setaudioSrc(translation.data.audio_file);

            }).catch(function (error) {
                console.error(error);
            });
        }

    }

    const getTextToVoice = (text) => {
        return axios.post('/api/test', { text, language })
    }

    const onPlay = async () => {
        elementRef.current.play();

    }

    const renderImg = () => {
        let selected = document.getElementById("selectOption");
        let imgUrl = ""
        if (selected.value == "es") {
            imgUrl = 'https://www.dropbox.com/s/36eojdo0dlqkbgv/Beach-of-Cancun.jpeg?raw=1'
        } else if (selected.value == "it") {
            imgUrl = 'https://www.dropbox.com/s/33nfoqswh76ucqr/italy.jpeg?raw=1'
        } else if (selected.value == "fr") {
            imgUrl = "https://www.dropbox.com/s/nce1709wc2y9z5n/france.jpeg?raw=1"
        } else if (selected.value == "de") {
            imgUrl = "https://www.dropbox.com/s/yf1q32po0yn2w23/germany.jpeg?raw=1"
        } else if (selected.value == "ja") {
            imgUrl = "https://www.dropbox.com/s/6asdqkfeg2b85kb/japan.jpeg?raw=1"
        } else if (selected.value == "no") {
            imgUrl = "https://www.dropbox.com/s/38lbm4n9g3dp85p/norway.jpeg?raw=1"
        } else if (selected.value == "pt") {
            imgUrl = "https://www.dropbox.com/s/ee9qki6u87bepc6/portugal.jpeg?raw=1"
        } else if (selected.value == "cs") {
            imgUrl = "https://www.dropbox.com/s/6v4sd4biawar6ti/czech_republic1.jpeg?raw=1"
        } else if (selected.value == "en") {
            imgUrl = "https://www.dropbox.com/s/yr72a8cilby4l2v/eastereggs.jpeg?raw=1"
        } else {
            imgUrl = ""
        }
        document.getElementById("myImg").src = imgUrl;
    }

    const twoCalls = (e) => {
        renderImg();
        selectLanguage(e);
    }

    const isDisabled = () => {
        if (values.input === '' || values.selectedLang === '') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="c-container">
            <header className="App-header">
                <h1>What would you like to translate?</h1>
            </header>

            <form id="form" onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={values.input}
                    className="input"
                    type="text"
                    name="input"
                    placeholder="Enter Text">
                </input>
            </form>
            <br></br>
            <h2>Select Language</h2>
            <audio src={audioSrc} ref={elementRef}></audio>
            <select name="language" onChange={twoCalls} value={values.selectedLang} id="selectOption">
                <option value="">Choose a language</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="no">Norwegian</option>
                <option value="pt">Portuguese</option>
                <option value="cs">Czech</option>
                {hasEasterEgg ? <option value="en">Easter Egg!</option> : null}

            </select>
            <br></br>
            <br></br>


           {isDisabled() ? <button
                className="not-pure-button pure-button-disabled"
                onClick={onSubmit}
                disabled={isDisabled()}>Translate it!<div className="arrow-wrapper"><div className="arrow"></div></div>
            </button> : <button
                className="pure-button pure-button-disabled"
                onClick={onSubmit}
                disabled={isDisabled()}>Translate it!<div className="arrow-wrapper"><div className="arrow"></div></div>
            </button>} 

            <br></br>
            {translation ? <div className="card"><h2>{translation}</h2></div> : null}

            <br></br>

            <div>
                {isDisabled() ? <button id="disabled-speaker"></button> : <button id="speaker" onClick={onPlay}></button>}
            </div>
            <br></br>
            <img id='myImg'></img>
            <video id="vid" src={video} muted loop autoPlay controls={true}></video>

            <div onClick={() => animate()} className="easter-egg-btn ">
                <Lottie options={defaultOptions}
                    height={100}
                    width={100}
                    isStopped={isStopped}
                    goToAndPlay={goto}
                />



            </div>
        </div>
    )
}

export default Form;