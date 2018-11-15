const express = require('express')
const http = require('http')
const fs = require('fs')
const fetch = require('node-fetch');
const port = 4002
const app = express()
const cors = require('cors')
app.use(cors())
app.options('*', cors())
const options_date = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
}
const log = []
const postDataDate = JSON.stringify({
  'date': 'Hello World!'
});
/* APP 3 */
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
app.get('/:id', (req, res) =>{
  const id = req.params.id
  if (typeof log[id - 1 ] != "undefined"){
    res.statusCode = 200
    res.send(log[id - 1 ])
  }
  else if (Number(id) != 'NaN') {
    if(id < 10 || id > 1){
      res.statusCode = 404
      res.send('Cet index n\'existe pas')
    }
    else{
      res.statusCode = 400
      res.send('Le parametre n\'est pas correct')
    }
  }
  else{
    res.statusCode = 400
    res.send('Le parametre n\'est pas correct')
  }
})
app.get('/', (req, res) => {
  const combinedData = {"time":{},"secret":{}}
  Promise.all([
    fetch('http://localhost:4000/',options_date).then(function(response){ return response.json()} ),
    fetch('http://localhost:4001/secret').then(function(response){return response.text()})
  ])
  .then((values)=>{
    combinedData["time"] = values[0]
    const dateJson = JSON.parse(combinedData["time"])
    const date = dateJson[0].date
    combinedData["time"] = date
    combinedData["secret"] = values[1]
    return combinedData
  })
  .then((results) =>{
    saveDateSecret(results)
    res.sendStatus = 200
    res.send(log)
  })
  .catch((err) =>{
    res.sendStatus = 500
    res.send('err')
  })
})
function saveDateSecret(data){
  log.unshift(data)
  if (log.length > 10){
    log.pop()
  }
  return log
}