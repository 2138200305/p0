
drop table if exists Reimbursement;
drop table if exists ReimbursementType;
drop table if exists ReimbursementStatus;
drop table if exists users;
drop table if exists Roles;




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


create table if not exists 
Users ( 
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
  dateSubmitted    DATE not null,
  dateResolved    DATE,
  description    VARCHAR(99) NOT NULL,
  --resolver	Integer NOT NULL,
--  status	Integer NOT NULL,
  -- reimbursementType   Integer NOT NULL,
resolver INTEGER references Users(user_id),
status INTEGER references ReimbursementStatus(statusId),
reimbursementType INTEGER references ReimbursementType(typeId)
);


insert into Roles (roles) values
	('Employee');
insert into Roles (roles) values
	('Finance Manager');



insert into ReimbursementStatus (status) values
	('Pending');
insert into ReimbursementStatus (status) values
	('Approved');
insert into ReimbursementStatus (status) values
	('Denied');


insert into ReimbursementType (ReimbursementType) values
	('Lodging');
insert into ReimbursementType (ReimbursementType) values
	('Travel');
insert into ReimbursementType (ReimbursementType) values
	('Food');
insert into ReimbursementType (ReimbursementType) values
	('Other');

insert into Users (username, user_password, firstName, lastName, email,user_role) values
	('jaenwawe', 'jpassword', 'Jae', 'Nwawe', 'nwawe.jae@gmail.com', 2);
	
insert into Users (username, user_password, firstName, lastName, email,user_role) values
	('dylan', 'dpassword', 'Dylan', 'Adams', 'adams@gmail.com', 2);

	insert into Users (username, user_password, firstName, lastName, email,user_role) values
	('techgod', 'tgpassword', 'Tech', 'Employee', 'tech@gmail.com',  1);


INSERT INTO  reimbursement (author, amount, datesubmitted, description, status,reimbursementtype)
values (1, .03, '01-01-2019', 'into to description', 1, 1)
 RETURNING author, amount, datesubmitted, description, status,reimbursementtype;
 

SELECT * FROM reimbursement;
select * from users;
SELECT * FROM reimbursement where status = 1;
select * from reimbursement;
SELECT * [except columnA] FROM tableA;
SELECT * except password FROM users;
GRANT ALL PRIVILIGES ON ALL TABLES IN SCHEMA PUBLIC TO reimbursements;
GRANT ALL priviliges ON ALL sequences IN SCHEMA public TO inventory USER;



--create table if not exists Users ( 
--	user_id serial primary key,
--	username VARCHAR(40) unique not null,
--	user_password VARCHAR(40) not null,
--  	firstName VARCHAR(40) not null,
--  	lastName VARCHAR(40)not null,
--  	email VARCHAR(40) not null,
--  	user_role INTEGER references Roles(role_id)
--);
--
--create table if not exists Reimbursement ( 
--	reimbursementId serial primary key,
--  author    Integer NOT NULL,
--  amount 	numeric    NOT NULL,
--  dateSubmitted    Date NOT NULL,
--  dateResolved    Date ,
--  description    VARCHAR(99) NOT NULL,
--  --resolver	Integer NOT NULL,
----  status	Integer NOT NULL,
--  -- reimbursementType   Integer NOT NULL,
--resolver INTEGER references Users(user_id),
--status INTEGER references ReimbursementStatus(statusId),
--reimbursementType INTEGER references ReimbursementType(typeId)
--);


--create table if not exists ReimbursementType(
--	typeId serial primary key,
--  ReimbursementType VARCHAR(40) NOT NULL unique
--  
--);


--create table if not exists  Roles ( 
--role_id serial primary key,
--roles varchar(40) NOT NULL UNIQUE
--);