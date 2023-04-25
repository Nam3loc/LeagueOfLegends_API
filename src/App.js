import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [ searchText, setSearchText ] = useState('')
  const [ playerData, setPlayerData ] = useState({})
  // const apiKey = process.env.RIOT_API_KEY;
  const apiKey = "RGAPI-2643774c-bce0-4723-899a-ed20b153a6a4l";

  function searchForPlayer(evt) {
    // Set up the correct API call
    const APICallString = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${apiKey}`

    // Handle the API call
    axios.get(APICallString).then(function(response) {
      setPlayerData(response.data);
    }).catch(function(error) {
      console.log(error);
    })
  }

  console.log(playerData);

  return (
    <div className="App">
      <div className='container'>
        <h3 className='font-header text-3xl'>League API</h3>
        <input type='text' onChange={evt => setSearchText(evt.target.value)}></input>
        <button onClick={evt => searchForPlayer(evt)}>Search</button>
      </div>
      {JSON.stringify(playerData) != '{}' 
      ? 
      <>
        <p>{playerData.name}</p>
        <img width="100" height="100" src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`}></img>
        <p>Summoner Level {playerData.summonerLevel}</p>
      </>
      :
      <><p>No player data</p></>
      }
    </div>
  );
}

export default App;