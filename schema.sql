DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS personnes;
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    creation_date DATETIME DEFAULT (datetime('now','localtime')),
    user_id INTEGER,
    personne_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    FOREIGN KEY(personne_id) REFERENCES personne(personne_id)
);

CREATE TABLE personnes (
    personne_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT NOT NULL,
    description TEXT,
    priority_score INT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO users (username, password) VALUES ("user", "password");
INSERT INTO users (username, password) VALUES ("user1", "password");
INSERT INTO personnes (fullname, description, priority_score, user_id) VALUES ("Patric POUYANNE", "PDG de total", 10, 1);
INSERT INTO personnes (fullname, description, priority_score, user_id) VALUES ("Maréchal Lyautey", "Créateur du Maroc", 9, 2);
INSERT INTO tasks (title, description, creation_date, user_id, personne_id) VALUES ("Make pouyanne proud", "See in the future", DATETIME('now'), 1, 1);
INSERT INTO tasks (title, description, creation_date, user_id, personne_id) VALUES ("Honor Lyautey spirit", "Read and think about his achivements", DATETIME('now'), 1, 2);