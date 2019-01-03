drop table macro;
drop table conflict;
drop table country;

CREATE TABLE country 
(country_id int PRIMARY KEY auto_increment, 
country_code varchar(3), 
country_name varchar(40));

CREATE TABLE IF NOT EXISTS conflict 
(conflict_id int PRIMARY KEY auto_increment, 
country_id int, 
actor1 varchar(1000), 
actor2 varchar(1000), 
associative_actor1 varchar(1000), 
associative_actor2 varchar(1000), 
event_type varchar(1000),
fatalities int,
conflict_date Date,
location varchar(1000),
FOREIGN KEY (country_id) REFERENCES country(country_id));

CREATE TABLE macro 
(macro_id int PRIMARY KEY auto_increment, 
country_id int, 
gdp int, 
population bigint, 	
macro_year int,
FOREIGN KEY (country_id) REFERENCES country(country_id));
