CREATE TABLE rewards (
	id INT PRIMARY KEY,
	name VARCHAR NOT NULL,
	cost INT NOT NULL,
);

CREATE TABLE inventory (
	id INT PRIMARY KEY,
	reward_id INT NOT NULL FOREIGN KEY REFERENCES rewards(id),
	time DATETIME NOT NULL DEFAULT (getdate()),
	quantity INT NOT NULL,
);

CREATE TABLE users (
	id INT PRIMARY KEY,
	role INT NOT NULL DEFAULT (3),
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
);

CREATE TABLE reward_history (
	id INT PRIMARY KEY,
	time DATETIME NOT NULL DEFAULT (getdate()),
	user_id INT NOT NULL FOREIGN KEY REFERENCES users(id),
	reward_id INT NULL FOREIGN KEY REFERENCES rewards(id),
);
