import React, { useEffect, useState } from 'react';

const initValue = ""


function Form() {
const [value, setValue] = useState(initValue)

const onChange = evt => {
    const { name, value } = evt.target
    setValue({...value, [name]: value})
}

const onSubmit = evt => {
    evt.preventDefault();
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
                <button>Translate it!</button>
        </div>
    )
}

export default Form;