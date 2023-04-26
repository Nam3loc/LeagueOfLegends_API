import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [ searchText, setSearchText ] = useState('');
  const [ playerData, setPlayerData ] = useState({});
  const [ matchId, setMatchId ] = useState({});
  const [ matchHistory, setMatchHistory ] = useState({});
  const apiKey = process.env.REACT_APP_RIOT_API_KEY;

  function searchForPlayer(evt) {
    // Set up the correct API call
    const summonerInfo = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${apiKey}`;
    
    // Handle the API call
    axios.get(summonerInfo).then(function(response) {
      setPlayerData(response.data);
      // console.log('puuid: ', response.data.puuid);
      setMatchId(response.data.puuid);
    }).catch(function(error) {
      console.log(error);
    })
  }

  // console.log(playerData);
  console.log(matchId);

  function getPlayerMatchHistory() {
    // Set up the correct API call
    const summonerMatchInfo = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${matchId}/ids?start=0&count=20&api_key=${apiKey}`;

    // Handle the API call
    axios.get(summonerMatchInfo).then(function(response) {
      setMatchHistory(response.data);
    }).catch(function(error) {
      console.log(error);
    })
  }

  return (
    <div id="App">
      <div id='header-container'>
        <h3 className='w-screen h-20 text-5xl flex justify-center items-center text-white bg-purple-700 mb-20'>Summoner Finder</h3>
      </div>
      <div id='input-container' className='mb-20 flex justify-center items-center'>
        <input className='w-3/4 h-11 border-solid rounded border-gray-400 border-2' type='text' onChange={evt => setSearchText(evt.target.value)}></input>
        <button className=' bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mx-0.5 border border-gray-400 rounded shadow' onClick={evt => {
          searchForPlayer(evt);
          getPlayerMatchHistory(evt);
        }}>Search</button>
      </div>
      <div id='summoner-info-and-match-history-container' className='flex justify-center items-center'>
        <div id='summoner-img-container' className='flex flex-col justify-center items-center'>
          {
            JSON.stringify(playerData) != '{}' 
            ? 
            <>
              <p>{playerData.name}</p>
                <img className='w-100px h-100px' src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/profileicon/${playerData.profileIconId}.png`}></img>
              <p>Summoner Level {playerData.summonerLevel}</p>
            </>
            :
            <><p className='flex justify-center items-center mx-20'>No player data</p></>
          }
        </div>

        <div id='match-history-container' className='flex flex-col justify-center items-center'>
          {
            matchHistory.length > 0 
            ? 
            matchHistory.map((match, index) => (
              <p key={index}>Match {index + 1}: {match}</p>
            ))
            :
            <><p className='flex justify-center items-center mx-20'>No match history </p></>
          }
        </div>
      </div>
    </div>
  );
}

export default App;