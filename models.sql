drop table if exists ReimbursementStatus;
drop table if exists ReimbursementType;
drop table if exists Reimbursement;
drop table if exists Role;
drop table if exists Roles;
drop table if exists users;

create table if not exists ReimbursementStatus (
	statusId serial primary key,
  status	VARCHAR(40) NOT NULL UNIQUE
);

create table if not exists ReimbursementType(
	typeId serial primary key,
  ReimbursementType VARCHAR(40) NOT NULL unique
  
);


create table if not exists  Roles ( 
role_id serial primary key,
roles varchar(40) NOT NULL UNIQUE
);


create table if not exists Users ( 
	user_id serial primary key,
	username VARCHAR(40) unique not null,
	user_password VARCHAR(40) not null,
  	firstName VARCHAR(40) not null,
  	lastName VARCHAR(40)not null,
  	email VARCHAR(40) not null,
  	user_role INTEGER references Roles(role_id)
);

create table if not exists Reimbursement ( 
	reimbursementId serial primary key,
  author    Integer NOT NULL,
  amount 	numeric    NOT NULL,
  dateSubmitted    Integer NOT NULL,
  dateResolved    Integer NOT NULL,
  description    VARCHAR(99) NOT NULL,
  --resolver	Integer NOT NULL,
--  status	Integer NOT NULL,
  -- reimbursementType   Integer NOT NULL,
resolver INTEGER references Users(user_id),
status INTEGER references ReimbursementStatus(statusId),
reimbursementType INTEGER references ReimbursementType(typeId)
);


ALTER TABLE users RENAME COLUMN user_id TO userId;
ALTER TABLE users RENAME COLUMN user_password TO password;
ALTER TABLE users RENAME COLUMN firstname TO firstName;
ALTER TABLE users RENAME COLUMN lastname TO lastName;
ALTER TABLE users RENAME column user_role TO role;


userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: number;

