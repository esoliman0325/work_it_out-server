const express = require("express");
const xss = require("xss");

const viewWorkoutsService = require("./viewWorkouts-service");
const viewWorkoutsRouter = express.Router();
const bodyParser = express.json();

const serializeBody = body => ({
    id: body.id,
    body_part: xss(body.body_part),
    date: xss(body.date)
});

viewWorkoutsRouter
    .route('/:userName')
        .get((req, res, next) => {
            let { userName } = req.params;
            let user = userName;
            // use date to query for individual workout...may have to do some date translation from f/e to b/e and vice versa
            viewWorkoutsService.getAllBody(req.app.get('db'), user)
                .then(body => {
                    console.log(body, 'body before')
                    if (body.length > 0 && body[0].body_part !== null) {
                    console.log(body, 'body')
                    viewWorkoutsService.getAllWorkouts(req.app.get('db'), user)
                        .then(workouts => {
                            console.log(workouts, 'workouts')
                        
                        viewWorkoutsService.getAll(req.app.get('db'), user)
                            .then(all => {
                                console.log(all, 'all')
                                res
                                    .status(200)
                                    .json({all: all, body: body, workouts: workouts})
                            })
                        })
                    } if (body.length < 1 || body[0].body_part === null) {
                        console.log('hello')
                        res
                            .status(204)
                            .json({})
                    }
                })
                .catch(next);
        })


module.exports = viewWorkoutsRouter;
