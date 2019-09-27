const addWorkoutsService = {

	checkUser(knex, user) {
		console.log('check user')
		return knex
			.select(
				'username.user_full_name',
				'username.id AS username_id'
				)
			.from('username')
			.where('user_full_name', '=', `${user.user_full_name}`)
			.returning('username.id')
			.then(id => {
				if (id.length > 0) {
					return id[0].username_id
				}
				false
			})
	},

	addUser(knex, user) {
		console.log('add user')
		return knex
			.insert(user)
			.into('username')
			.returning('username.id')
			.then(id => {
				console.log(id, 'add user user id')
				if (id.length > 0) {
					return id[0]
				}
				false
			})
	},
	
	checkBody(knex, newBody, userIdCheck) {
		console.log('check body')
		return knex
			.select(
				'username.user_full_name',
				'username.id AS username_id',
				'body.id AS body_id',
				'body.date',
				'body.body_part',
			)
			.from('username')
			.where('username.id', '=', `${userIdCheck}`)
			.leftJoin('body', 'username.id', 'body.user_full_name_id')
			.where('body.date', '=', `${newBody.date}`)
			.andWhere('body.body_part', '=', `${newBody.body_part}`)
			.returning('*')
			.then(entry => {
				console.log(entry, 'idddddd')
				if (entry.length > 0) {
					return entry[0].body_id
				}
				false
			})
	},

	addAll(knex, newBody, newWorkout, userIdAdd, userIdCheck) {
		let userId = userIdAdd ? userIdAdd.toString() : userIdCheck.toString()
		let body = {user_full_name_id: userId, ...newBody}
		console.log(userIdAdd, 'user Id Add All')
		console.log(userIdCheck, 'user Id Check Add All')
			return knex
				.insert(body)
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
							'body.body_part',
							'body.user_full_name_id'
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
					'body.body_part',
					'body.user_full_name_id'
					)
					.from('workout')
					.where('workout.id', '=', workoutStrId)
					.leftJoin('body', 'workout.body_part_id', 'body.id')
		})
  }
}

module.exports = addWorkoutsService