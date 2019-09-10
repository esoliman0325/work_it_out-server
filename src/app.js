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

// 1) all fields required - must validate exist
// 2) 
app.use('/viewworkouts', viewWorkoutsRouter, deleteWorkoutsRouter);
app.use('/addworkouts', addWorkoutsRouter);
//app.use("/api/workouts", workoutsRouter);




// 1) all fields required - must validate exist
// 2) 

// app.post('/addworkout', (req, res, next) => {
// 	// field boolean validation (all field)
// 	for (const field of ['bodyPart', 'exercise,', 'sets', 'reps']) {
// 		if(!req.body[field]) {
// 			return res.status(400).send(`${field} is required.`)
// 		}
// 	}

// 	// text string validation (body part, exercise)
// 	for (const field of ['bodypart', 'exercise']) {
// 		if(!typeof req.body[field] == 'string') {
// 			return res.status(400).send(`${field} must be a text value.`)
// 		}
// 	}

// 	// is a number validation (sets, reps)
// 	for (const field of ['sets', 'reps', 'weight']) {
// 		if(!typeof req.body[field] == 'string') {
// 			return res.status(400).send(`${field} must be an integer.`)
// 		}
// 	}

// 	const { bodyPart, exercise, sets, reps, weight} = req.body
// 	const newWorkout = { bodyPart, exercise, sets, reps, weight }

// 	workoutService.insertWorkout(
// 		req.app.get('db'),
// 		newWorkout
// 	)
// 		.then(workout => {
// 			res
// 				.status(201)
// 				.json(workout)
// 		})
// 		.catch(next)

	
    
// });

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