const viewWorkoutsService = {
    getAll(knex, user) {
        return knex
        .select(
            'username.user_full_name',
            'username.id',
            'body.id AS body_id',
            'body.date',
            'body.body_part',
            'body.user_full_name_id',
            'workout.exercise',
            'workout.sets',  
            'workout.reps',
            'workout.weight',
            'workout.id AS workoutId',
            'workout.body_part_id AS body_id_reference'
        )
        .from('username')
        .where('user_full_name', '=', `${user}`)
        .leftJoin('body', 'username.id', 'body.user_full_name_id')
        .leftJoin('workout', 'body.id', 'workout.body_part_id')
    },

    getAllBody(knex, user) {
        return knex
        .select(
            'username.user_full_name',
            'username.id',
            'body.id',
            'body.date',
            'body.body_part',
            'body.user_full_name_id'
        )
        .from('username')
        .where('user_full_name', '=', `${user}`)
        .leftJoin('body', 'username.id', 'body.user_full_name_id')
    },

    getAllWorkouts(knex, user) {
        return knex
        .select(
            'username.user_full_name',
            'username.id',
            'body.id',
            'body.date',
            'body.body_part',
            'body.user_full_name_id'
        )
        .from('username')
        .where('user_full_name', '=', `${user}`)
        .leftJoin('body', 'username.id', 'body.user_full_name_id')
        .then(bodyID => {
            let idArray = bodyID.map(body => body.id.toString())
            return knex
                .select('*')
                .from('workout')
                .whereIn('body_part_id', idArray)
        })
    },
}

module.exports = viewWorkoutsService;