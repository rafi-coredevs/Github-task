
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { Octokit } = require("octokit")
const bodyParser = require('body-parser');
dotenv.config();
const app = express();
app.use(bodyParser.json());

const octokit = new Octokit({ auth: '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'})

app.get('/', async(req, res)=>{
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
  res.status(200).send(`Greetings from ${login}`)
})

// Commits
app.post('/commits', async (req, res)=>{
  const owner = req?.body?.owner;
  const repo = req?.body?.repo;
  const page = req?.body?.page || 1;
  try{
  if(owner  && repo){
   const {data} = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
      owner: 'OWNER',
      repo: 'REPO',
      per_page: 10,
      page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    const response = data?.map(item => {
      return({
        sha: item.sha,
        name: item.commit.author.name,
        email: item.commit.author.email,
        date: item.commit.author.date,
        message:item.commit.message,
      })
    });
    
    res.status(200).send(data);
   
  }else if(owner === '' || owner ===  undefined){
    res.status(400).send('owner is Empty')
  }else if(repo === "" || repo === undefined){
    res.status(400).send('repo is Empty')
  }else{
    res.status(500).send('something went wrong')
  }
}catch(err){
  res.status(err.status).send(err.response.data.message)
}
})

// collaborators
app.post('/collaborators', async (req, res)=>{
  const owner = req?.body?.owner;
  const repo = req?.body?.repo;
  try{
  if(owner  && repo){
   const {data} = await octokit.request(`GET /repos/${owner}/${repo}/collaborators`, {
    owner: 'OWNER',
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
    const response = data?.map(item => {
      return({
        name: item.login,
        image: item.avatar_url,
        profile: item.html_url,
      })
    });
    
    res.status(200).send(response);
   
  }else if(owner === '' || owner ===  undefined){
    res.status(400).send('owner is Empty')
  }else if(repo === "" || repo === undefined){
    res.status(400).send('repo is Empty')
  }else{
    res.status(500).send('something went wrong')
  }
}catch(err){
  res.status(err.status).send(err.response.data.message)
}
})

// Contribution
app.post('/contribution',async (req, res)=>{
  const username = req.body.userName;
  const dateCounts = {};
  try{
    const {data} = await octokit.rest.activity.listPublicEventsForUser({
      username
    });
    data.forEach(item => {
      const date = item.created_at.split("T")[0]; // Extract the date part
      if (dateCounts[date]) {
          dateCounts[date]++;
      } else {
          dateCounts[date] = 1;
      }
  });
    res.status(200).send(dateCounts);
  }catch(err){
    console.log(err);
  }
})
app.listen(process.env.PORT || 5000, ()=>{
  console.log(`App listening to ${process.env.PORT}` )
})

