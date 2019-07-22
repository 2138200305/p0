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

insert into Roles (roles) values
	('Finance Manager');
insert into Roles (roles) values
	('Admin');
insert into Roles (roles) values
	('User');

insert into Users (username, user_password, firstName, lastName, email,user_role) values
	('jaenwawe', 'jpassword', 'Jae', 'Nwawe', 'nwawe.jae@gmail.com', 1);
	
insert into Users (username, user_password, firstName, lastName, email,user_role) values
	('dylan', 'dpassword', 'Dylan', 'Adams', 'adams@gmail.com', 2);

	insert into Users (username, user_password, firstName, lastName, email,user_role) values
	('techgod', 'tgpassword', 'Tech', 'Employee', 'tech@gmail.com', 3 );







ALTER TABLE users RENAME COLUMN user_id TO userId;
ALTER TABLE users RENAME COLUMN user_password TO password;
ALTER TABLE users RENAME COLUMN firstname TO firstName;
ALTER TABLE users RENAME COLUMN lastname TO lastName;
ALTER TABLE users RENAME column user_role TO role;






insert into Users (username, password, firstname, lastname, email,role) values
	('dylan', 'dpassword', 'Dylan', 'Adams', 'adams@gmail.com', 2);
	insert into Users (username, password, firstname, lastname, email,role) values
	('smart', 'kpassword', 'Kyle', 'Sir', 'kyle@gmail.com', 1);

test commit

{
    "userid": 4,
    "username": "smart",
    "password": "kpassword",
    "firstname": "Kyle",
    "lastname": "SirMonday",
    "email": "kyle@gmail.com",
    "role": 1
}

   

"author": "1",
"amount": ".03", 
"dateSubmitted": "01-01-209",
"description":"into to description", 
"status": "1", 
"type":"1"

{

	"role": 1,
    "reimbursementId": 2,
    "author": 1,
    "amount": 10.57,
    "dateSubmitted": "7-15-2019",
    "dateResolved": "7-1-2019",
    "description": "descripition order",
    "resolver": 2,
    "status": 1,
    "type": 1
	
	
}


{
"author": 1,
"amount": ".03", 
"dateSubmitted": "01-01-2019",
"description":"into to description", 
"status": 1, 
"type":1
}


{
"author": 1,
"amount": ".63", 
"dateSubmitted": "01-01-2019",
"description":"kyle to one on one", 
"status": 1, 
"type":1
}

{

	"role": 1,
    "reimbursementId": 2,
    "author": 1,
    "amount": 100.99,
    "dateSubmitted": "7-15-2019",
    "dateResolved": "7-1-2019",
    "description": "patch descripition order",
    "resolver": 2,
    "status":2 ,
    "type": 1
	
	
}


{

	"role": 1,
    "reimbursementId": 2,
    "author": 1,
    "amount": 500.00,
    "dateSubmitted": "7-15-2019",
    "dateResolved": "7-1-2019",
    "description": "updaer",
    "resolver": 2,
    "status":2 ,
    "type": 1
	
	
}







//add user json
{
    "userId": 2,
    "username": "techgod",
    "password": "longPassword",
    "firstName": "Tech",
    "lastName": "Employee",
     "email": "tech@gmail.com",
     "role": 3
    }

//add reimbursement json
	{

    "author": "1",
    "amount": "800.47",
    "dateSubmitted": "7-14-2013",
    "description": "iQ order",
    "status": "1",
    "type": "1"
	
	
}


//sql examples
select * from users;

select * from users where username like	'techgod' and user_password like 'tgpassword';

select * from reimbursement where reimbursementid = 2;
select * from reimbursement;

select * from users where username like	'techgod' and user_password like 'tgpassword';
select * from users where username like	'techgod' and user_password like 'tgpassword';

userId: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: number;


insert into reimbursement (author, amount, datesubmitted, description, status,reimbursementtype) values
	(1, 89.39, '7-4-2019', 'lodging order',1, 1);

	select * from users;
