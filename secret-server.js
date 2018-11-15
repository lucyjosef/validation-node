const express = require('express')
const fs = require('fs')
const fse = require('fs-extra')
const cors = require('cors')

const port = 4001

const app = express()

const jsonMiddleware = express.json()
app.use(jsonMiddleware)

app.use(cors())
app.options('*', cors())


/* secret server */
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

app.get('/secret', function(req, res){
	if (req.accepts('json')) {
		fs.readFile(__dirname + '/data/secret.txt', 'utf8', (err, data) => {
			if (err) throw err;
			const reversed = reverseString(data)
			let json = JSON.stringify([{"text": reversed}])
			console.log(json)
			res.send(json)
		})
	} else {
		// error
		res.sendStatus(406)
	}
})

app.post('/secret', (req,res) => {
	const reversed = reverseString(req.body.text.toString())
	fs.writeFile(__dirname + '/data/secret.txt', reversed, 'utf8', ()=>{
		res.json(reversed)
	})
})

/* PRIVATE FUNCTIONS */
function reverseString(str) {
	return str.split('').reverse().join('')
}