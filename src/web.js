// Dependencies
var express = require('express')
var morgan = require("morgan")
var path = require("path")

var app = express()

// Settings
app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'swig')
app.use(morgan("dev"))

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
