
DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;
USE calendar;

CREATE TABLE availability (

  id int NOT NULL AUTO_INCREMENT,
  addrID int NOT NULL,
  startDate DATE  NOT NULL,
  endDate DATE NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE address (
  id        int    NOT NULL AUTO_INCREMENT,
  homeAddr  varchar(255)   NOT NULL,
  PRIMARY KEY (ID)
);

-- mysql -u root < server/schema.sql