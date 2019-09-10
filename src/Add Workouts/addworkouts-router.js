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
    .route("/")
        .post(bodyParser, (req, res, next) => {
						const { body_part, exercise, sets, reps, weight, date } = req.body;
						let validateData = { body_part, exercise, sets, reps, weight, date };
            let newBody = { body_part, date };
						let newWorkout = { exercise: exercise, sets: String(sets), reps: String(reps), weight: String(weight) };
						
            console.log(newWorkout, 'new workout body');
						console.log(newBody.body_part, 'new body body');

						for (const field of ['body_part', 'exercise', 'sets', 'reps', 'weight', 'date']) {
							if (!validateData[field]) {
									console.log(`${field} is required`);
									return res
											.status(400)
											.send({ error: { message: `'${field}' is required` } });
							}
						}
						
						addWorkoutsService.checkBody(req.app.get('db'), newBody)
						// console.log('main call')
							.then(id => {
								console.log(id, 'id length')
								// need to say if (body and date already exist)
								// console.log(id, 'id if exists')
								if (id) {
									addWorkoutsService.addWorkout(req.app.get('db'), newWorkout, id)
										.then(workout => {
											console.log(workout, 'post response')
											res
												.status(201)
												.json(workout)
										
										})
										.catch(next)
								} else {
									// console.log('mid call')
									addWorkoutsService.addAll(req.app.get('db'), newBody, newWorkout)
										.then(workout => {
											console.log(workout, 'post response')
											res
												.status(201)
												.json(workout)
										})
										.catch(next)
									// console.log('end call')
								}
							})
							.catch(next)


            // addWorkoutsService.addBody(req.app.get('db'), newBody, newWorkout)
						// 	.then(res => {
						// 		res
						// 			.status(201)
						// 	})
						// 	.catch(next);
				})
    // .post(bodyParser, (req, res, next) => {
    //     const { bodyP } = req.body;
    //     const newBody = { bodyP };
        // for (const field of ["body_part", "date"]) {
        //     if (!newBody[field]) {
        //         logger.error(`${field} is required`);
        //         return res
        //             .status(400)
        //             .send({ error: { message: `'${field}' is required` } });
        //     }
        // }

    //     WorkoutsService.insertBody(req.app.get("db"), newBody)
    //         .then(bodyPart => {
    //             logger.info(`Body Part with id ${bodyPart.id} was added to list`);
    //             res
    //                 .status(201)
    //                 .json(serializeFolder(bodyPart));
    //         })
    //         .catch(next);
    // });

    module.exports = addWorkoutsRouter;