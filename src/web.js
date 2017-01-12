// Dependencies
var express = require('express')
var morgan = require("morgan")
var path = require("path")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")

// Project dependencies
var config = require('./config')

var app = express()

// Settings
var app = express()
app.set('port', (config.port))
app.set('views', path.join(__dirname, 'presenter/templates/'))
app.use(morgan(config.environment))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// mongoose.connect(config.mongo_url)

// Public folder
app.use(express.static(path.join(__dirname, "../public")))

// Error 404
app.use(function(req, res, next){
	res.status(404)

	// respond with html page
	if (req.accepts('html')) {
		return res.send("Página no encontrada")
	}

	// respond with json
	if (req.accepts('json')) {
		return res.json({ error: 'Recurso no encontrado' })
	}

	// default to plain-text. send()
	return res.type('txt').send('Not found')
})

// Start Server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'))
})
