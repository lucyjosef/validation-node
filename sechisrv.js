const express = require('express')
const fs = require('fs')
const port = 4002
const app = express()

/* APP 3 */
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
app.get('/', (req, res, next) => {
  fetch('http:localhost:4000/')
  .then(function(date){
    const dateText = date.blob()
    fetch('http:localhost:4001/secret')
    .then(function(secret){
      return secret.blob()
    })
    .then((results)=> {
      const secretText = results.blob()
      const data = [
        { date: dateText, secret: secretText },
      ]
      res.send(data)
    })
  })
  .catch(err => {
    res.send('Ca a échoué')
  })
})