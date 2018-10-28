INSERT INTO dbo.rewards (name, cost) VALUES
	('Cadbury Dairy Milk', 20),
	('Cadbury Crunchy', 20),
	('Coca Cola 600ml', 20),
	('Coca Cola 1.5L', 50);

INSERT INTO dbo.inventory (reward_id, quantity) VALUES
	(1, 12),
	(1, 12),
	(2, 12),
	(3, 24),
	(4, 6);

INSERT INTO dbo.users (firstName, lastName, role, email, hash) VALUES
  ('Jesse', 'Example', 3, 'jesse@example.com', '12345'),
  ('Jay', 'Example', 3, 'jay@example.com', '12345'),
  ('Patrick', 'Example', 3, 'patrick@example.com', '12345');

INSERT INTO dbo.reward_history (user_id) VALUES
  (1),
  (1),
  (2),
  (2),
  (2),
  (3),
  (3);

INSERT INTO dbo.reward_history (user_id, reward_id) VALUES
  (1, 1);
