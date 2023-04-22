import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [ searchText, setSearchText ] = useState('')
  const RIOT_API_KEY = process.env.RIOT_API_KEY;

  function searchForPlayer(evt) {
    // Set up the correct API call
    const APICallString = 'https://na1.api.riotgames.com'
    // Handle the API call
  }

  return (
    <div className="App">
      <div className='container'>
        <h3>League API</h3>
        <input type='text' onChange={evt => setSearchText(evt.target.value)}></input>
        <button onClick={evt => searchForPlayer(evt)}>Search</button>
      </div>
    </div>
  );
}

export default App;


// https://www.youtube.com/watch?v=w9qaS6Q0Yr8
// 12:01