const express = require('express')
const fs = require('fs')
fse = require('fs-extra')

const port = 8000
const port3 = 4002
const port4 = 4003

const app = express()
const app3 = express()
const app4 = express()

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

/* APP 3 */
app3.listen(port3, () => {
  console.log(`Listening on ${port3}`)
})

/* APP 4 */
app4.listen(port4, () => {
	console.log(`Listening on ${port4}`)
})
app4.use(
  '/client',
  express.static(__dirname + '/public')
)