import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initValue = ""


function Form() {
    const [values, setValues] = useState(initValue)
    const [translation, setTranslation] = useState("")

    const onChange = evt => {
        setValues(evt.target.value)
        console.log(evt.target.value)

    }
    console.log("VALUES:", values)

    const onSubmit = evt => {
        evt.preventDefault();
        getTranslation();
    }

    const getTranslation = () => {
        const options = {
            method: 'GET',
            url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
            params: { langpair: 'en|it', q: values },
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
            <button onClick={onSubmit}>Translate it!</button>
            <br></br>
            <h2>{translation}</h2>
        </div>
    )
}

export default Form;