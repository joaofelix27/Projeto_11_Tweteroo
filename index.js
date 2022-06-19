import express from 'express';
import cors from 'cors';

const app = express(); // cria um servidor
app.use(express.json());
app.use(cors());

const usersData=[];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const userData = req.body; // será o objeto com os dados de login
  usersData.push(userData);
  res.status(201).send("OK");
});
app.post('/tweets', (req, res) => {
    const tweet = {... req.body, avatar:usersData[0].avatar}; // será o objeto com os dados do  tweet
    tweets.push(tweet);
    res.status(201).send("OK");
  });
app.get('/tweets', (req, res) => {
    let lastTweets = tweets.slice(-10)
    res.send(lastTweets); 
});

app.listen(5000);