const viewWorkoutsService = {
    getAll(knex, firstDay, lastDay, user) {
        return knex
        .select(
            'userName.user_full_name',
            'userName.id',
            'body.id AS body_id',
            'body.date',
            'body.body_part',
            'workout.exercise',
            'workout.sets',  
            'workout.reps',
            'workout.weight',
            'workout.id AS workoutId',
            'workout.body_part_id AS body_id_reference'
        )
        .from('userName')
        .where('user_full_name', '=', `${user}`)
        .leftJoin('body', 'user.id', 'body.user_full_name_id')
        .where('date', '>=', `'${firstDay}'`)
        .andWhere('date', '<=', `'${lastDay}'`)
        .leftJoin('workout', 'body.id', 'workout.body_part_id')
        // .from('body')
        // .where('date', '>=', `'${firstDay}'`)
        // .andWhere('date', '<=', `'${lastDay}'`)
        // .leftJoin('workout', 'body.id', 'workout.body_part_id')
    },

    getAllBody(knex, firstDay, lastDay) {
        return knex
        .select('*'
            // 'body.id',
            // 'body.date',
            // 'body.body_part',
            // 'workout.exercise',
            // 'workout.sets',  
            // 'workout.reps',
            // 'workout.weight',
        )
        .from('body')
        // .from('body')
        // .whereRaw('??::date = ?', ['date', date])
        .where('date', '>=', `'${firstDay}'`)
        .andWhere('date', '<=', `'${lastDay}'`)
        // .returning('id')
        // .then(entries => {
        //     entries.map(entry => entry.id {

        //     }
        //     ) 
        //     // let strID = id.toString()
        //     // return knex
        //     //     .select('*')
        //     //     .where(strID, '=', 'body_part_id')
        // })
        // .leftJoin('workout', 'body.id', 'workout.body_part_id')
    },

    getAllWorkouts(knex, firstDay, lastDay) {
        return knex
        .select('body.id')
        .from('body')
        // .from('body')
        // .whereRaw('??::date = ?', ['date', date])
        .where('date', '>=', `'${firstDay}'`)
        .andWhere('date', '<=', `'${lastDay}'`)
        .then(bodyID => {
            let idArray = bodyID.map(body => body.id.toString())
            return knex
                .select('*')
                .from('workout')
                .whereIn('body_part_id', idArray)
        })
        // .leftJoin('workout', 'body.id', 'workout.body_part_id')
    },
}

module.exports = viewWorkoutsService;