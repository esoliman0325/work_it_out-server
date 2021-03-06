const viewWorkoutsService = {
    getAll(knex, firstDay, lastDay) {
        return knex
        .select(
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
        .from('body')
        .where('date', '>=', `'${firstDay}'`)
        .where('date', '<=', `'${lastDay}'`)
        .leftJoin('workout', 'body.id', 'workout.body_part_id')
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
    // id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    // exercise TEXT NOT NULL,
    // sets INTEGER NOT NULL,
    // reps INTEGER NOT NULL,
    // weight INTEGER NOT NULL,
    // body_part_id INTEGER REFERENCES body(id) ON DELETE CASCADE NOT NULL

    // SELECT 
    //     d.id, 
    //     d.dept_name, 
    //     e.emp_name, 
    //     e.phone, 
    //     e.title, 
    //     e.salary 
    // FROM 
    // department d 
    // JOIN 
    // employee e 
    // ON d.manager = e.id;

    insertBodyParts(knex, newBodyParts) {
        return knex
            .insert(newBodyParts)
            .into("body")
            .returning("*")
            .then(rows => {
                console.log(rows[0]);
                return rows[0];
            })
    }
}

module.exports = viewWorkoutsService;