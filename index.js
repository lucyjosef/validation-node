const express = require('express')
const fs = require('fs')
fse = require('fs-extra')
const port = 8000

const app = express()

app.listen(port, () => {
	console.log(`Listening on ${port}`)
})

app.use(
  '/client',
  express.static(__dirname + '/public')
)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
