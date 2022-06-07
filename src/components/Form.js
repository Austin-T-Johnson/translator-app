import React, { useState } from 'react';
import axios from 'axios';

const initValue = ""
const LANGUAGES = [
//                 { label: "es", value: "Spanish" },
//                 { label: "it", value: "Italian" },
//                 { label: "cs", value: "Czech" },
//                 { label: "de", value: "German" },
//                 { label: "ja", value: "Japanese" },
//                 { label: "la", value: "Latin" },
//                 { label: "no", value: "Norwegian" },
//                 { label: "pt", value: "Portuguese" }
// ]


function Form() {
    const [values, setValues] = useState(initValue)
    const [translation, setTranslation] = useState("")
    const [language, setLanguage] = useState("es")

    const onChange = evt => {
        setValues(evt.target.value)
        console.log(evt.target.value)

    }
    
    const onSubmit = evt => {
        evt.preventDefault();
        getTranslation();
    }

    const chooseLanguage = () => {
     
        setLanguage()
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
            console.log(response.data.responseData.translatedText);
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
           
            <select name="languages" id="lang">
                <option id="es">Spanish</option>
                <option id="it">Italian</option>
                <option id="cs">Czech</option>
                <option id="de">German</option>
                <option id="ja">Japanese</option>
                <option id="la">Latin</option>
                <option id="no">Norwegian</option>
                <option id="pt">Portuguese</option>
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