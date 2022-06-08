import React, { useState } from 'react';
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
    const [language, setLanguage] = useState("es-MX-2")
    const [hasDexLang, setHasDexLang] = useState(false)
    const [isStopped, setIsStopped] = useState(true);
    const [goto, setGoto] = useState();
    const [voiceCode, setVoiceCode] = useState()
    const [sequence, setSequence] = useState({
        segments: [108, 138],
        forceFlag: true
    });

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

    const getTranslation = () => {
        const options = {
            method: 'GET',
            url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
            params: { langpair: `en|${language}`, q: values },
            headers: {
                'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com',
                'X-RapidAPI-Key': '85f2f02d04msh465340af7983dbep158beejsnc533b3ca83f5'
            }
        };
        if (language == 'dex') {
            setTranslation(getDexLangTranslation())
        } else {
            axios.request(options).then(function (response) {
                setTranslation(response.data.responseData.translatedText)
            }).catch(function (error) {
                console.error(error);
            });
        }

    }

    const getTextToVoice = () => {
        const encodedParams = new URLSearchParams();
        encodedParams.append("voice_code", `${language}`);
        encodedParams.append("text", `${translation}`);
        encodedParams.append("speed", "1.00");
        encodedParams.append("pitch", "1.00");
        encodedParams.append("output_type", "audio_url");

        const options = {
            method: 'POST',
            url: 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com',
                'X-RapidAPI-Key': '85f2f02d04msh465340af7983dbep158beejsnc533b3ca83f5'
            },
            data: encodedParams
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
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
            <select value={language} name="languages" onChange={selectLanguage}>
                
                <option value="es-MX-2" >Spanish</option>
                <option value="it-IT-1">Italian</option>
                <option value="fr-FR-1">French</option>
                <option value="de-DE-1">German</option>
                <option value="ja-JP-1">Japanese</option>
                <option value="nb-NO-2">Norwegian</option>
                <option value="pt-PT-1">Portuguese</option>
                <option value="cs-CZ-1">Czech</option>
                {hasDexLang ? <option value="dex">Dex Lang</option> : null}

            </select>
            <br></br>
            <br></br>
            <button onClick={onSubmit}>Translate it bruh</button>
            <br></br>
            <h2>{translation}</h2>
            <br></br>
            <i id="speaker" className="fa-solid fa-volume-high" onClick={getTextToVoice}></i>
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