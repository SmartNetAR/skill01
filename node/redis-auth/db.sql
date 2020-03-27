CREATE TABLE auth_db.users (
	id BIGINT UNSIGNED auto_increment NOT NULL,
	fullname varchar(150) NOT NULL,
	email varchar(150) NOT NULL,
	password varchar(200) NOT NULL,
	CONSTRAINT users_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
