// Imports
import { useState } from 'react';
import axios from 'axios';
import { puuid } from './SummonerInfo.js';
import { apiKey } from '../App.js';

export default function getPlayerMatchHistory() {
  const [ matchHistory, setMatchHistory ] = useState({});

  // Set up the correct API call
  const summonerMatchInfo = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`;

  // Handle the API call
  axios.get(summonerMatchInfo).then(function(response) {
    setMatchHistory(response.data);
  }).catch(function(error) {
    console.log(error);
  })
}