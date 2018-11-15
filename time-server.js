const express = require('express')
const port = 4000
const app = express()


app.get('/', (req, res) => {

    var currentdate = new Date();
    var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    
    // respond with html page and text
    if (req.accepts(['html', 'text'])) {
        res
        .header('content-type : text/plain')
        .send(
            `
            <p style="color : blue;">
            ${datetime.toString()}
            </p>
            `
            )
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        let json = [{date : datetime}]
        res
        .header('content-type : application/json')
        .json(json)
        return;
    }

    // Error
    res.sendStatus(406)

  })


app.listen(port, () => {
    console.log(`Hello time-server.js - Listening on ${port}`)
  })