Database configuration
1. Log in to the MySQL server using this command then add your password
```
mysql -u root -p
```
2. create the schema 
```
CREATE DATABASE smartParking;
```
3. create the user
```
CREATE USER 'smartParking'@'localhost' IDENTIFIED BY 'smartParking123';
GRANT ALL PRIVILEGES ON smartParking.* TO 'smartParking'@'localhost';
FLUSH PRIVILEGES;
```
