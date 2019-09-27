const viewWorkoutsService = {
    getAll(knex, firstDay, lastDay, user) {
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
        .where('body.date', '>=', `'${firstDay}'`)
        .andWhere('body.date', '<=', `'${lastDay}'`)
        .leftJoin('workout', 'body.id', 'workout.body_part_id')
    },

    getAllBody(knex, firstDay, lastDay, user) {
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
        .where('body.date', '>=', `'${firstDay}'`)
        .andWhere('body.date', '<=', `'${lastDay}'`)
    },

    getAllWorkouts(knex, firstDay, lastDay, user) {
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
        .where('body.date', '>=', `'${firstDay}'`)
        .andWhere('body.date', '<=', `'${lastDay}'`)
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