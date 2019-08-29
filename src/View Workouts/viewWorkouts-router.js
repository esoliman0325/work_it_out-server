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
    .route('/:firstDay/:lastDay')
        .get((req, res, next) => {
            let { firstDay, lastDay } = req.params;
            let first = firstDay;
            let last = lastDay;
            // use date to query for individual workout...may have to do some date translation from f/e to b/e and vice versa
            viewWorkoutsService.getAllWorkouts(req.app.get("db"), first, last)
                .then(entry => {
                    res.json(entry);
                })
                .catch(console.log('err'));
    })
    // .post(bodyParser, (req, res, next) => {
    //     console.log(req.body);
    //     const newBody = req.body;
    //     console.log(newBody);
    //     console.log(newBody.body_part);
    //     console.log(newBody.date);
    //     for (const field of ["body_part", "date"]) {
    //         if (!newBody[field]) {
    //             return res
    //                 .status(400)
    //                 .send({ error: { message: `'${field}' is required` } });
    //         }
    //     }

    //     BodyPartsService.insertBodyParts(req.app.get("db"), newBody)
    //         .then(bodyPart => {
    //             console.log(`Body Part with id ${bodyPart.id} was added to list`);
    //             res
    //                 .status(201)
    //                 .json(serializeBody(bodyPart));
    //         })
    //         .catch(next);
    // });

module.exports = viewWorkoutsRouter;
