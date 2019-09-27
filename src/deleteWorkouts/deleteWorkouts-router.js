const express = require("express");
const xss = require("xss");

const deleteWorkoutsService = require("./deleteWorkouts-service");
const deleteWorkoutsRouter = express.Router();
const bodyParser = express.json();

const serializeBody = body => ({
    id: body.id,
    body_part: xss(body.body_part),
    date: xss(body.date)
});

deleteWorkoutsRouter
    .route('/:workoutId/:workoutBodyIdRef/:userId')
        .delete((req, res, next) => {
						let { workoutId, workoutBodyIdRef, userId } = req.params;
						let user = userId;
            let workout = workoutId;
            let workoutBodyId = workoutBodyIdRef;
            console.log(workout, 'workout')
						console.log(workoutBodyId, 'workout body id')
						console.log(user, 'user Id from f/e')

            deleteWorkoutsService.checkWorkout(req.app.get('db'), workoutBodyId, user)
                .then(entry => {
                    console.log(entry, 'value')
                    // need to say if (body and date already exist)
                    // console.log(id, 'id if exists')
                    if (entry) {
											deleteWorkoutsService.deleteWorkout(req.app.get('db'), workout)
												.then(workout => {
														console.log(workout, 'workout deleted')
														res
															.status(204)
															.end()
													
													})
												.catch(next)
										} 
										else if (entry === false) {
                      // console.log('mid call')
											deleteWorkoutsService.deleteAll(req.app.get('db'), workout, workoutBodyId, user)
												.then(workout => {
													console.log(workout, 'body all deleted')
														res
															.status(204)
															.end()
													})
												.catch(next)
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


module.exports = deleteWorkoutsRouter;