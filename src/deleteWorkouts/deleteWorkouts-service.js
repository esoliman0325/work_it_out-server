const deleteWorkoutsService = {
	
	checkWorkout(knex, workoutBodyId) {
        console.log('check body')
        let workoutBodyStrId = workoutBodyId.toString()
		return knex
			.select('*')
			.from('workout')
			.where('body_part_id', '=', `${workoutBodyStrId}`)
			.returning('*')
			.then(entry => {
				console.log(entry, 'workout Body')
				if (entry.length > 1) {
					return entry
				}
			})
	},

	deleteAll(knex, workout, workoutBodyId) {
		console.log('delete all workout')
        let workoutStrId = workout.toString()
        let workoutBodyStrId = workoutBodyId.toString()
        return knex
            .select('*')
            .from('workout')
            .where('id', '=', `${workoutStrId}`)
            .delete()
            .returning('*')
			.then(workout => {
                console.log(workout, 'all workout deleted')
				return knex
					.select('*')
					.from('body')
                    .where('id', '=', `${workoutBodyStrId}`)
                    .delete()
                    .returning('*')
			})
	},

	deleteWorkout(knex, workout) {
		console.log('delete workout')
		let workoutStrId = workout.toString()
        return knex
            .select('*')
            .from('workout')
            .where('id', '=', `${workoutStrId}`)
            .delete()
            .returning('*')
		// 	.insert(workout)
		// 	.into('workout')
		// 	.returning('id')
		// 	.then(workoutId => {
		// 		console.log(workoutId, 'workoutId')
		// 		let workoutStrId = workoutId.toString()
		// 		return knex
		// 			.select(
		// 			'workout.exercise',
		// 			'workout.sets',  
		// 			'workout.reps',
		// 			'workout.weight',
		// 			'workout.id AS workoutId',
		// 			'workout.body_part_id AS body_id_reference',
		// 			'body.id AS body_id',
		// 			'body.date',
		// 			'body.body_part'
		// 			)
		// 			.from('workout')
		// 			.where('workout.id', '=', workoutStrId)
		// 			.leftJoin('body', 'workout.body_part_id', 'body.id')
		// })
  }
}

module.exports = deleteWorkoutsService