const deleteWorkoutsService = {
	
	checkWorkout(knex, workoutBodyId, user) {
        console.log('check body')
		let workoutBodyStrId = workoutBodyId.toString()
		let userStrId = user.toString()

		return knex
			.select('*')
			.from('body')
			.leftJoin('workout', 'body.id', `workout.body_part_id`)
			.where('body.user_full_name_id', '=', `${userStrId}`)
			.andWhere('workout.body_part_id', '=', `${workoutBodyStrId}`)
			.returning('*')
			.then(entry => {
				console.log(entry, 'workout Body')
				if (entry.length > 1) {
					return entry
				}
				return false
			})
	},

	deleteAll(knex, workout, workoutBodyId, user) {
		console.log('delete all workout')
        let workoutStrId = workout.toString()
		let workoutBodyStrId = workoutBodyId.toString()
		let userStrId = user.toString()

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
					// .leftJoin('workout', 'body.id', `workout.body_part_id`)
					.where('body.user_full_name_id', '=', `${userStrId}`)
					.andWhere('body.id', '=', `${workoutBodyStrId}`)
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