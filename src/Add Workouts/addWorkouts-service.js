const addWorkoutsService = {
	// addWorkout(knex, ) {
	// 	return knex
	// 	.select(
	// 			'body.id',
	// 			'body.date',
	// 			'body.body_part',
	// 			'workout.exercise',
	// 			'workout.sets',  
	// 			'workout.reps',
	// 			'workout.weight',
	// 	)
	// 	.from('body')
	// 	// .whereRaw('??::date = ?', ['date', date])
	// 	.where('date', '=', `'${firstDay}'`)
	// 	.where('date', '<=', `'${lastDay}'`)
	// 	.leftJoin('workout', 'body.id', 'workout.body_part_id')
	// 	},
		
	// addWorkout(knex, workout) {
	// 	return knex.select("*").from("workouts");
  //   },
	addBody(knex, newBody, newWorkout) {
		return knex
			.insert(newBody)
			.into('body')
			.returning('id')
				.then(id => {
					.insert(newWorkout)
					.into('workout')
					.where('body_part_id', '=', id)
				})
	},

	addWorkout(knex, newWorkout) {
		return knex
			.insert(newWorkout)
			.into('workout')
			.where()
			.returning('*')
			// .then(newWorkout => {
			// 		console.log(newWorkout[0])
			// })
  }
}

module.exports = addWorkoutsService