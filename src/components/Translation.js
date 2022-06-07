import React, { useState } from 'react'
import axios from 'axios'

function Translation(props) {

    const [translation, setTranslation] = useState("")

    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/api/get',
        params: { langpair: 'en|es', q: 'Max is the man!!', mt: '1', onlyprivate: '0', de: 'a@b.c' },
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
    return (
        <div>

            <h2>{translation}</h2>

        </div>
    )



}

export default Translation;