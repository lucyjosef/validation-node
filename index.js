const express = require('express')
const fs = require('fs')
fse = require('fs-extra')

const port1 = 4000
const port2 = 4001
const port3 = 4002
const port4 = 4003

const app1 = express()
const app2 = express()
const app3 = express()
const app4 = express()

const jsonMiddleware = express.json()
app2.use(jsonMiddleware)


/* APP 1 */
app1.listen(port1, () => {
  console.log(`Listening on ${port1}`)
})

app1.get('/', function(req, res){
	console.log('route de base')
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


/* PRIVATE FUNCTIONS */
function reverseString(str) {
	return str.split('').reverse().join('')
}