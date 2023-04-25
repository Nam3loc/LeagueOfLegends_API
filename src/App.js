import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [ searchText, setSearchText ] = useState('');
  const [ playerData, setPlayerData ] = useState({});
  const apiKey = process.env.REACT_APP_RIOT_API_KEY;

  function searchForPlayer(evt) {
    // Set up the correct API call
    const APICallString = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${apiKey}`;

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
        <h3 className='w-screen h-20 text-5xl flex justify-center items-center text-white bg-purple-700 mb-20'>Summoner Finder</h3>
        <input className='w-2/4 h-11 border-solid rounded border-gray-400 border-2 mb-20' type='text' onChange={evt => setSearchText(evt.target.value)}></input>
        <button className=' bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-0.5 border border-gray-400 rounded shadow' onClick={evt => searchForPlayer(evt)}>Search</button>
      </div>
      {JSON.stringify(playerData) != '{}' 
      ? 
      <>
        <p>{playerData.name}</p>
        <div className='flex justify-center items-center'>
          <img className='w-100px h-100px' src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`}></img>
        </div>
        <p>Summoner Level {playerData.summonerLevel}</p>
      </>
      :
      <><p>No player data</p></>
      }
    </div>
  );
}

export default App;