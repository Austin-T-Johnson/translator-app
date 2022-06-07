import React, { useState } from 'react';
import axios from 'axios';

const initValue = ""

function Form() {
    const [values, setValues] = useState(initValue)
    const [translation, setTranslation] = useState("")
    const [language, setLanguage] = useState("es")

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

        axios.request(options).then(function (response) {
            // console.log(response.data.responseData.translatedText);
            setTranslation(response.data.responseData.translatedText)
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
           
            <select name="languages" id="lang" onChange={selectLanguage}>
                <option value="es" >Spanish</option>
                <option value="it">Italian</option>
                <option value="cs">Czech</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
                <option value="la">Latin</option>
                <option value="no">Norwegian</option>
                <option value="pt">Portuguese</option>
            </select>
            <br></br>
            <br></br>
            <button onClick={onSubmit}>Translate it bruh</button>
            <br></br>
            <h2>{translation}</h2>
        </div>
    )
}

export default Form;