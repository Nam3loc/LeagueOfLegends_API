const { Configuration } = require('riot'); // const { Configuration, OpenAIApi} = require("openai");
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.RIOT_API_KEY
})

const riot = new RiotAPI(config); // const openai = new OpenAIApi(config);