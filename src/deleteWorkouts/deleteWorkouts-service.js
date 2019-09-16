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
  }
}

module.exports = deleteWorkoutsService