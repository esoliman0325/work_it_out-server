TRUNCATE TABLE workout, body, userName RESTART IDENTITY;

INSERT INTO userName (user_full_name)
	VALUES
		('Emad Soliman'),
		('Philo Mina'),
		('Cody Thomson');

INSERT INTO body (body_part, date, user_full_name_id)
	VALUES
		('chest', '2019-8-22', 3),
		('back', '2019-8-22', 2),
		('biceps', '2019-8-23', 1),
		('triceps', '2019-8-23', 1);

INSERT INTO workout (exercise, sets, reps, weight, body_part_id)
	VALUES
		('bench press', 3, 8, 185, 1),
		('dumbbell fly', 3, 6, 45, 1),
		('machine row', 2, 6, 180, 2),
		('bicep curl', 5, 5, 50, 3),
		('tricep extension', 5, 6, 30, 4);
