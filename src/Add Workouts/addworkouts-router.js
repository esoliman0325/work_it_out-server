const express = require("express");
const xss = require("xss");

const addWorkoutsService = require("./addWorkouts-service");
const addWorkoutsRouter = express.Router();
const bodyParser = express.json();

const serializeBody = body => ({
    id: body.id,
    body_part: xss(body.body_part),
    date: xss(body.date)
});

// delete workouts...check if workout has parent reference, if so then don't delete, otherwise delete

addWorkoutsRouter
    .route('/')
        .post(bodyParser, (req, res, next) => {
						const { body_part, exercise, sets, reps, weight, date, user_full_name } = req.body;
						let user = { user_full_name };
						let validateData = { body_part, exercise, sets, reps, weight, date };
            let newBody = { body_part, date };
						let newWorkout = { exercise: exercise, sets: String(sets), reps: String(reps), weight: String(weight) };
						
						console.log(user.user_full_name, 'user');
            console.log(newWorkout, 'new workout body');
						console.log(newBody.body_part, 'new body body');
						console.log(newBody.date, 'date')

						for (const field of ['body_part', 'exercise', 'sets', 'reps', 'weight', 'date']) {
							if (!validateData[field]) {
									console.log(`${field} is required`);
									return res
											.status(400)
											.send({ error: { message: `'${field}' is required` } });
							}
						}
						

					addWorkoutsService.checkUser(req.app.get('db'), user)
					.then(userIdCheck => {
						console.log(userIdCheck, 'user Id check')
						if(userIdCheck) {
							addWorkoutsService.checkBody(req.app.get('db'), newBody, userIdCheck)
							.then(id => {
								console.log(id, 'id length')
								if (id) {
									// needso return user ID in response
									addWorkoutsService.addWorkout(req.app.get('db'), newWorkout, id)
										.then(workout => {
											console.log(workout, 'post response')
											res
												.status(201)
												.json(workout)
										
										})
										.catch(next)
								} else {
									// needs to return user ID in response
									addWorkoutsService.addAll(req.app.get('db'), newBody, newWorkout, userIdCheck)
										.then(workout => {
											console.log(workout, 'post response')
											res
												.status(201)
												.json(workout)
										})
										.catch(next)
								}
							})
						} else if(!userIdCheck) {
							addWorkoutsService.addUser(req.app.get('db'), user)
							.then(userIdAdd => {
								console.log(userIdAdd, 'user id add')
								// needs to return user ID in response
										addWorkoutsService.addAll(req.app.get('db'), newBody, newWorkout, userIdAdd)
											.then(workout => {
												console.log(workout, 'post response')
												res
													.status(201)
													.json(workout)
											})
											.catch(next)
									})
						}
					})
					.catch(next)
				})

    module.exports = addWorkoutsRouter;