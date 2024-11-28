CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES
	(1, 'Ode to Joy (Dubstep Remix)', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
	(2, 'Tetris Theme (Simplified)', 'E4 B3 C4 D4 E4 D4 C4 B3 A3 A3 B3 C4 D4 C4 B3 A3 G3 E4 G3 A3 B3 B3 C4 A3 G3 E4'),
	(3, 'Old MacDonald Had a Farm', 'C4 D4 E4 C4 C4 D4 E4 C4 E4 F4 G4 E4 F4 G4 G4 A4 G4 F4 E4 D4 C4 G4 A4 G4 F4 E4 D4 C4'),
	(4, 'Row, Row, Row Your Boat', 'C4 C4 C4 D4 E4 E4 D4 E4 F4 G4 C4 C4 G4 G4 E4 E4 D4 D4 C4 G4 F4 E4 D4 C4'),
	(5, 'Happy Birthday to You', 'C4 C4 D4 C4 F4 E4 C4 C4 D4 C4 G4 F4 C4 C4 C5 A4 F4 E4 D4 A#4 A#4 A4 F4 G4 F4');

