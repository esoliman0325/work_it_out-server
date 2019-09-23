require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('../postgrator-config')
const viewWorkoutsRouter = require('./View Workouts/viewWorkouts-router')
const addWorkoutsRouter = require('./Add Workouts/addworkouts-router')
const deleteWorkoutsRouter = require('./deleteWorkouts/deleteWorkouts-router')

const app = express()
const morganOption = (NODE_ENV === 'production')
	? 'tiny'
	: 'common';

	
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())


app.use('/viewworkouts', viewWorkoutsRouter, deleteWorkoutsRouter);
app.use('/addworkouts', addWorkoutsRouter);


app.use(function errorHandler(error, req, res, next) {
	let response
	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error' } }
	} else {
		response = { message: error.message, error }
		console.log(response, 'response')
	}
	res.status(500).json(response)
})

module.exports = app