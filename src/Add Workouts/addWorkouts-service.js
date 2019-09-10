const addWorkoutsService = {
	
	checkBody(knex, newBody) {
		console.log('check body')
		return knex
			.select('*')
			.from('body')
			.where('body_part', '=', `${newBody.body_part}`)
			.andWhere('date', '=', `${newBody.date}`)
			.returning('*')
			.then(entry => {
				console.log(entry, 'id\n\n\n')
				if (entry.length > 0) {
					return entry[0].id
				}
				false
			})
	},

	addAll(knex, newBody, newWorkout) {
		console.log('addbody')
		return knex
			.insert(newBody)
			.into('body')
			.returning('id')
			.then(bodyId => {
				let bodyStrId = bodyId.toString()
				let workout = {body_part_id: bodyStrId, ...newWorkout}
				return knex
					.insert(workout)
					.into('workout')
					.returning('id')
			})
				.then(workoutId => {
					console.log(workoutId, 'workoutId')
					let workoutStrId = workoutId.toString()
					return knex
						.select(
						'workout.exercise',
						'workout.sets',  
						'workout.reps',
						'workout.weight',
						'workout.id AS workoutId',
						'workout.body_part_id AS body_id_reference',
						'body.id AS body_id',
						'body.date',
						'body.body_part'
						)
						.from('workout')
						.where('workout.id', '=', workoutStrId)
						.leftJoin('body', 'workout.body_part_id', 'body.id')
			})

	},

	addWorkout(knex, newWorkout, id) {
		console.log(id, 'id', 'addworkout')
		let strID = id.toString()
		let workout = {body_part_id: strID, ...newWorkout}
		return knex
			.insert(workout)
			.into('workout')
			.returning('id')
			.then(workoutId => {
				console.log(workoutId, 'workoutId')
				let workoutStrId = workoutId.toString()
				return knex
					.select(
					'workout.exercise',
					'workout.sets',  
					'workout.reps',
					'workout.weight',
					'workout.id AS workoutId',
					'workout.body_part_id AS body_id_reference',
					'body.id AS body_id',
					'body.date',
					'body.body_part'
					)
					.from('workout')
					.where('workout.id', '=', workoutStrId)
					.leftJoin('body', 'workout.body_part_id', 'body.id')
		})
  }
}

module.exports = addWorkoutsService