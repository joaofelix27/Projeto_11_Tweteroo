import express from 'express';
import cors from 'cors';

const app = express(); // cria um servidor
app.use(express.json());
app.use(cors());

const usersData=[];
const tweets = [];

app.post('/sign-up', (req, res) => {
  const userData = req.body; // será o objeto com os dados de login
  const userAvatar= userData.avatar
  const userName= userData.username
  if (userName && userAvatar ) {
    usersData.push(userData);
  res.status(201).send("OK");
  } else {res.status(400).send("Todos os campos são obrigatórios!");}
  
});
app.post('/tweets', (req, res) => {
    const tweetData=req.body
    const userName=tweetData.username
    const userTweet=tweetData.tweet
    if (userName && userTweet ) {
      const userAvatar= usersData.find(user => user.username===tweetData.username)
      const tweet = {... tweetData, avatar:userAvatar.avatar}; // será o objeto com os dados do  tweet
      tweets.push(tweet);
      res.status(201).send("OK");
    } else {res.status(400).send("Todos os campos são obrigatórios!");}
   
  });
app.get('/tweets', (req, res) => {
    let lastTweets = tweets.slice(-10)
    res.send(lastTweets); 
});

app.listen(5000);