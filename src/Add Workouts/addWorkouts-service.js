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
	
	checkBody(knex, newBody) {
		return knex
			.select(newBody)
			.from('body')
			.returning('id')
	},

	addBody(knex, newBody, newWorkout) {
		console.log('addbody')
		return knex
			.insert(newBody)
			.into('body')
			.returning('id')
			.then(id => {
				let strID = id.toString()
				let workout = {body_part_id: strID, ...newWorkout}
				return knex
				//shouldnt need first insert because above
					// .insert({ body_part_id: strID })
					// .into('workout')
					.insert(workout)
					// .insert(newWorkout)
					.into('workout')
			})
			// .then(retu=> console.log(retu))
	},

	addWorkout(knex, newWorkout, id) {
		console.log(id, 'addbody')
		let strID = id.toString()
		let workout = {body_part_id: strID, ...newWorkout}
		return knex
			.insert(workout)
			.into('workout')
			// .then(newWorkout => {
			// 		console.log(newWorkout[0])
			// })
  }
}

module.exports = addWorkoutsService