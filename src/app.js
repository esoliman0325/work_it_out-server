require('dotenv').config()
console.log(process.env.DATABASE_URL) 
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { API_TOKEN, PORT, DATABASE_URL } = require('./config');
const helmet = require('helmet')
const { NODE_ENV } = require('../postgrator-config')
const viewWorkoutsRouter = require('./View Workouts/viewWorkouts-router')
const addWorkoutsRouter = require('./Add Workouts/addworkouts-router')
const deleteWorkoutsRouter = require('./deleteWorkouts/deleteWorkouts-router')

const app = express()
const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

	
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


// validate bearer token middleware
app.use(function validateBearerToken(req, res, next) {
	const apiToken = API_TOKEN
	const authToken = req.get('Authorization')
  
	if (!authToken || authToken.split(' ')[1] !== apiToken) {
	  return res.status(401).json({ error: 'Unauthorized request' })
	}
	next()
  })
  
// routing  
app.use('/viewworkouts', viewWorkoutsRouter, deleteWorkoutsRouter);
app.use('/addworkouts', addWorkoutsRouter);

//error handler
app.use(function errorHandler(error, req, res, next) {
	let response

	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error', db: DATABASE_URL } }
	} else {
		response = { error }
		console.log(response, 'response')
	}
	res.status(500).json(response)
})

module.exports = app