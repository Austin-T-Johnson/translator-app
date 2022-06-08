import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie-segments';
import * as animationData from '../assets/lottie_animations/egg.json';
import getDexLangTranslation from '../helpers/getTranslation';

const initValue = "";

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
    const [language, setLanguage] = useState("es")
    const [hasDexLang, setHasDexLang] = useState(false)
    const [isStopped, setIsStopped] = useState(true);
    const [goto, setGoto] = useState();
    const [voiceCode, setVoiceCode] = useState();
    const [audioSrc, setaudioSrc] = useState()
    useEffect(()=>{
       // elementRef.current.play();
    }, [audioSrc])

    const [sequence, setSequence] = useState({
        segments: [108, 138],
        forceFlag: true
    });
    const elementRef = useRef();

    const onChange = evt => {
        setValues(evt.target.value)
    }

    const onSubmit = evt => {
        evt.preventDefault();
        getTranslation();
    }

    const selectLanguage = (e) => {
        console.log('EVENT TARGET:', e.target.value)
        setLanguage(e.target.value);
       
    }
    const setDexLanguage = () => {
        setIsStopped(false);
        setHasDexLang(true)
    }
    
   
    const animate = () => {
        setGoto({
            value: 114,
            isFrame: true
        })
        setIsStopped(false);
        setDexLanguage();
    }

    const getTranslation = async () => {
        const options = {
            method: 'GET',
            url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
            params: { langpair: `en|${language}`, q: values },
            headers: {
                'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com',
                'X-RapidAPI-Key': '85f2f02d04msh465340af7983dbep158beejsnc533b3ca83f5'
            }
        };
        
        if (language == 'en') {
            let translation = await getTextToVoice(response.data.responseData.translatedText);
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
        // const encodedParams = new URLSearchParams();
        // encodedParams.append("voice_code", `${language}`);
        // encodedParams.append("text", `${text}`);
        // encodedParams.append("speed", "1.00");
        // encodedParams.append("pitch", "1.00");
        // encodedParams.append("output_type", "audio_url");

        // const options = {
        //     method: 'POST',
        //     url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com',
        //         'X-RapidAPI-Key': '85f2f02d04msh465340af7983dbep158beejsnc533b3ca83f5'
        //     },
        //     data: encodedParams
        // };



        return axios.post('/api/test', {text:'my penis is hard', language})
    }

    const onPlay = async () => {
        elementRef.current.play();
        //elementRef.src = url;
        
        
    }

    return (
        <div>
            <header className="App-header">
                <h1>Translate Some Stuff</h1>
            </header>
            <form id="form" onSubmit={onSubmit}>
                <h2>What do you wanna translate bruh?</h2>
                <input name="input" onChange={onChange} type="text" placeholder='write here bruh'></input>
            </form>
            <br></br>
            <h2>What language bruh?</h2>
            <audio src={audioSrc} ref={elementRef}></audio>
            <select name="languages" onChange={selectLanguage}>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="la">Latin</option>
                <option value="no">Norwegian</option>
                <option value="pt">Portuguese</option>
                <option value="cs">Czech</option>
                {hasDexLang ? <option value="en">Dex Lang</option> : null}

            </select>
            <br></br>
            <br></br>
            <button onClick={onSubmit}>Translate it bruh</button>
            <br></br>
            <h2>{translation}</h2>
            <br></br>
            <i id="speaker" className="fa-solid fa-volume-high" onClick={onPlay}></i>
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