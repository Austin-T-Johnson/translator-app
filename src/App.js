import React from 'react'
import './App.css';
import Translation from './components/Translation';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Translate Some Stuff</h1> 
                </header>
                <h2>What do you wanna translate bruh?</h2>
                <input type="text" placeholder='write here bruh'></input>
           

            <Translation />




        </div>
    );
}

export default App;
