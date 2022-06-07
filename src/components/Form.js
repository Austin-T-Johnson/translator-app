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
    const [language, setLanguage] = useState("es")
    const [hasDexLang, setHasDexLang] = useState(false)
    const [isStopped, setIsStopped] = useState(true);
    const [goto, setGoto] = useState();



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
        if(language == 'dex'){
            setTranslation(getDexLangTranslation())
        }else{
           axios.request(options).then(function (response) {
            // console.log(response.data.responseData.translatedText);
            setTranslation(response.data.responseData.translatedText)
        }).catch(function (error) {
            console.error(error);
        }); 
        }
        
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
            <select name="languages" id="lang" onChange={selectLanguage}>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
                <option value="cs">Czech</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="la">Latin</option>
                <option value="no">Norwegian</option>
                <option value="pt">Portuguese</option>
                {hasDexLang ? <option value="dex">Dex Lang</option> : null}
                
            </select>
            <br></br>
            <br></br>
            <button onClick={onSubmit}>Translate it bruh</button>
            <br></br>
            <h2>{translation}</h2>
            <div onClick={()=> animate()} className="easter-egg-btn ">
            <Lottie options={defaultOptions}
              height={100}
              width={100}
              isStopped={isStopped}
              
              goToAndPlay={goto}
              />
                {/* <i className="fa fa-egg animated wobble infinite"></i> */}
            </div>
        </div>
    )
}

export default Form;