TRUNCATE TABLE workout, body RESTART IDENTITY CASCADE;

INSERT INTO body (body_part, date)
	VALUES
		('chest', '2019-8-22'),
		('back', '2019-8-22'),
		('arms', '2019-8-23'),
		('triceps', '2019-8-23');

INSERT INTO workout (exercise, sets, reps, weight, body_part_id)
	VALUES
		('bench press', 3, 8, 185, 1),
		('dumbbell fly', 3, 6, 45, 1),
		('machine row', 2, 6, 180, 2),
		('bicep curl', 5, 5, 50, 3),
		('tricep extension', 5, 6, 30, 4);
