const express = require('express')
const fs = require('fs')
fse = require('fs-extra')

const port1 = 4000
const port2 = 4001
const port4 = 4003

const app1 = express()
const app2 = express()
const app4 = express()


/* APP 1 */
app1.listen(port1, () => {
  console.log(`Listening on ${port1}`)
})

app1.get('/', function(req, res){
	console.log('route de base')
})


/* APP 2 secret server */
app2.listen(port2, () => {
  console.log(`Listening on ${port2}`)
})

app2.get('/secret', function(req, res){
	fs.readFile(__dirname + '/data/secret.txt', 'utf8', (err, data) => {
		if (err) throw err;
		const reversed = reverseString(data)
		res.send(reversed)
	})
})

app2.put('/secret', function(req,res) {
	console.log(req.body)
	// const reversed = reverseString(req.body.toString())
	// fs.writeFile(__dirname + '/data/secret.txt', reversed, 'utf8', ()=>{
	// 	res.json(reversed)
	// })
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