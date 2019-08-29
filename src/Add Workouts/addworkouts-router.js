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

addWorkoutsRouter
    .route("/")
        .post(bodyParser, (req, res, next) => {
						const { body_part, exercise, sets, reps, weight, date } = req.body;
						let validateData = { body_part, exercise, sets, reps, weight, date };
            let newBody = { body_part, date };
						let newWorkout = { exercise, sets, reps, weight };
						
            console.log(newWorkout, 'new workout body');
						console.log(newBody, 'new body body');

						for (const field of ['body_part', 'exercise', 'sets', 'reps', 'weight', 'date']) {
							if (!validateData[field]) {
									console.log(`${field} is required`);
									return res
											.status(400)
											.send({ error: { message: `'${field}' is required` } });
							}
					}
            addWorkoutsService.addBody(req.app.get('db'), newBody)
                .then(bodyEntry => {
									console.log(bodyEntry[0], 'posted body')
                })
                // .then(addWorkoutsService.addWorkout(req.app.get('db'), newWorkout))
                // .then(workoutEntry => {
                //     console.log(workoutEntry, 'posted workout');
                // })
                // .catch(next);
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