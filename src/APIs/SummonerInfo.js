// Imports
import { searchText } from '../App.js';
import { useState } from 'react';
import axios from 'axios';
import { apiKey } from '../App.js';

export default function searchForPlayer(props) {
  const [ playerData, setPlayerData ] = useState({});

  let puuid = '';

  console.log(searchText);

  // Set up the correct API call
  const summonerInfo = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${apiKey}`;
  
  // Handle the API call
  axios.get(summonerInfo).then(function(response) {
    setPlayerData(response.data);
    // console.log('puuid: ', response.data.puuid);
    puuid = response.data.puuid;
  }).catch(function(error) {
    console.log(error);
  })

  console.log('Player Data in summInfo.js: ', playerData);
  console.log('puuid in summInfo.js: ', puuid);
}