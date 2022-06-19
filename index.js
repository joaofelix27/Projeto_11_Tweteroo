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
    const pagina=req.query.page;
    let lastTweets = tweets.slice(-10).reverse()
    if (pagina>1){
      lastTweets = tweets.slice(tweets.length-(pagina*10),(pagina-1)*-10).reverse()
    }
    res.send(lastTweets); 
});
app.get('/tweets/:userName', (req, res) => {
  const userName = req.params.userName;
  const userTweets= tweets.filter(tweet => tweet.username===userName)
  res.send(userTweets)
});
app.listen(5000);