const { AzureOpenAI } = require("openai");
require('dotenv').config();

const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-04-01-preview";
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const modelName = "gpt-35-turbo";
const deployment = "gpt-35-turbo";
const options = { endpoint, apiKey, deployment, apiVersion }

const client = new AzureOpenAI(options);

console.log("Azure-OpenAI-Client initialized");
  
module.exports = {client, modelName}; 

