import React, { useState } from 'react'
import getTranslation from './helpers/getTranslation';

function App() {
    const [translation, setTranslation] = useState('');
    const [value, setValue] = useState('');
    const [tryAgain, setTryAgain] = useState(false);
    let updateTranslation = () => {
        setTranslation(getTranslation());
        setTryAgain(true)
    }
    let changeTryAgain = () => {
        setTryAgain(false);
        setValue('');
        setTranslation('');
    }
    let translateMessage = () => {
        if(!tryAgain){
            updateTranslation()
        }else{
            changeTryAgain()
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Translate Some Stuff</h1> 
                </header>
                <h2>What do you wanna translate bruh?</h2>
                <div className="container">
                <input value={value} type="text" onChange={(v) => setValue(v.value)} placeholder='write here bruh'></input>
               <div className={`translation-arrow ${translation != '' ? 'active' :''}`}> <i className="fal fa-arrow-down"></i></div>
                {translation != ''  ? <div className="translation"> {translation}</div> : null}
                
                <button className={`translate-btn ${value != '' ? '' : 'disabled'}`} onClick={translateMessage}>{!tryAgain ? 'Translate!':'Try Again'}</button>
                </div>

            
        </div>
    );
}

export default App;
