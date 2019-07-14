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


insert into reimbursement (author, amount, datesubmitted, description, status,reimbursementtype) values
	(1, 89.39, '7-4-2019', 'lodging order',1, 1);

	select * from users;


select * from users where username like	'techgod' and user_password like 'tgpassword';

