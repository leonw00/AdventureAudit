CREATE DATABASE IF NOT EXISTS `test`;
GRANT ALL ON `test`.* TO 'admin'@'%';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON db.* TO 'admin'@'localhost';
GRANT ALL PRIVILEGES ON test.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;