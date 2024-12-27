-- Insert data into `User` table
INSERT IGNORE INTO `smartParking`.`User` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@example.com', 'adminpass', 'SystemAdmin'),
(2, 'manager@example.com', 'managerpass', 'LotManager'),
(3, 'driver@example.com', 'driverpass', 'Driver');

-- Insert data into `LotManager` table
INSERT IGNORE INTO `smartParking`.`LotManager` (`id`, `User_id`, `first_name`, `last_name`, `phone_number`) VALUES
(1, 2, 'John', 'Doe', '555-1234');

-- Insert data into `Driver` table
INSERT IGNORE INTO `smartParking`.`Driver` (`id`, `User_id`, `first_name`, `last_name`, `card_holder_name`, `phone_number`, `license_plate_number`, `card_no`, `cvv`, `card_expiry_date`) VALUES
(1, 3, 'Alice', 'Smith', 'Alice Smith', '555-5678', 'ABC123', '4111111111111111', '123', '2025-12-01');

-- Insert data into `ParkingLot` table
INSERT IGNORE INTO `smartParking`.`ParkingLot` (`id`, `name`, `location`, `capacity`, `owner_id`) VALUES
(1, 'Alexandria Parking', ST_GeomFromText('POINT(31.2156 29.9553)'), 100, 1),
(2, 'Stanley Parking', ST_GeomFromText('POINT(31.2156 29.9355)'), 100, 1),
(3, 'Raml Station Parking', ST_GeomFromText('POINT(31.2343 29.9708)'), 100, 1),
(4, 'Montaza Parking', ST_GeomFromText('POINT(31.2068 29.9006)'), 100, 1),
(5, 'Mansheya Parking', ST_GeomFromText('POINT(31.2410 29.9689)'), 100, 1);


-- Insert data into `ParkingSpot` table
INSERT IGNORE INTO `smartParking`.`ParkingSpot` (`id`, `ParkingLot_id`, `type`, `status`) VALUES
(1, 1, 'REGULAR', 'AVAILABLE'),
(2, 1, 'HANDICAP', 'OCCUPIED'),
(3, 1, 'EV', 'RESERVED'),
(4, 2, 'REGULAR', 'AVAILABLE'),
(5, 2, 'HANDICAP', 'OCCUPIED'),
(6, 2, 'EV', 'RESERVED'),
(7, 3, 'REGULAR', 'AVAILABLE'),
(8, 3, 'HANDICAP', 'OCCUPIED'),
(9, 3, 'EV', 'RESERVED'),
(10, 4, 'REGULAR', 'AVAILABLE'),
(11, 4, 'HANDICAP', 'OCCUPIED'),
(12, 4, 'EV', 'RESERVED'),
(13, 5, 'REGULAR', 'AVAILABLE'),
(14, 5, 'HANDICAP', 'OCCUPIED'),
(15, 5, 'EV', 'RESERVED'),
(16, 1, 'REGULAR', 'AVAILABLE'),
(17, 1, 'HANDICAP', 'OCCUPIED'),
(18, 1, 'EV', 'RESERVED'),
(19, 2, 'REGULAR', 'AVAILABLE'),
(20, 2, 'HANDICAP', 'OCCUPIED'),
(21, 2, 'EV', 'RESERVED'),
(22, 3, 'REGULAR', 'AVAILABLE'),
(23, 3, 'HANDICAP', 'OCCUPIED'),
(24, 3, 'EV', 'RESERVED'),
(25, 4, 'REGULAR', 'AVAILABLE'),
(26, 4, 'HANDICAP', 'OCCUPIED'),
(27, 4, 'EV', 'RESERVED'),
(28, 5, 'REGULAR', 'AVAILABLE'),
(29, 5, 'HANDICAP', 'OCCUPIED'),
(30, 5, 'EV', 'RESERVED'),
(31, 1, 'REGULAR', 'AVAILABLE'),
(32, 1, 'HANDICAP', 'OCCUPIED'),
(33, 1, 'EV', 'RESERVED'),
(34, 2, 'REGULAR', 'AVAILABLE'),
(35, 2, 'HANDICAP', 'OCCUPIED'),
(36, 2, 'EV', 'RESERVED'),
(37, 3, 'REGULAR', 'AVAILABLE'),
(38, 3, 'HANDICAP', 'OCCUPIED'),
(39, 3, 'EV', 'RESERVED'),
(40, 4, 'REGULAR', 'AVAILABLE'),
(41, 4, 'HANDICAP', 'OCCUPIED'),
(42, 4, 'EV', 'RESERVED'),
(43, 5, 'REGULAR', 'AVAILABLE'),
(44, 5, 'HANDICAP', 'OCCUPIED'),
(45, 5, 'EV', 'RESERVED'),
(46, 1, 'REGULAR', 'AVAILABLE'),
(47, 1, 'HANDICAP', 'OCCUPIED'),
(48, 1, 'EV', 'RESERVED'),
(49, 2, 'REGULAR', 'AVAILABLE'),
(50, 2, 'HANDICAP', 'OCCUPIED'),
(51, 2, 'EV', 'RESERVED'),
(52, 3, 'REGULAR', 'AVAILABLE'),
(53, 3, 'HANDICAP', 'OCCUPIED'),
(54, 3, 'EV', 'RESERVED'),
(55, 4, 'REGULAR', 'AVAILABLE'),
(56, 4, 'HANDICAP', 'OCCUPIED'),
(57, 4, 'EV', 'RESERVED'),
(58, 5, 'REGULAR', 'AVAILABLE'),
(59, 5, 'HANDICAP', 'OCCUPIED'),
(60, 5, 'EV', 'RESERVED');


-- Insert data into `Reservation` table
INSERT IGNORE INTO `smartParking`.`Reservation` (`id`, `Driver_id`, `ParkingSpot_id`, `ParkingLot_id`, `duration`, `start_time`, `status`, `price`) VALUES
(1, 1, 1, 1, '01:30:00', '2024-12-27 08:00:00', 'ACTIVE', 10.00);

-- Insert data into `ReservationRules` table
INSERT IGNORE INTO `smartParking`.`ReservationRules` (`LotManager_id`, `time_limit`) VALUES
(1, '02:00:00');

-- Insert data into `PenalityRules` table
INSERT IGNORE INTO `smartParking`.`PenalityRules` (`penality_type`, `LotManager_id`, `cost`, `time`) VALUES
('OVERSTAY', 1, 20.00, '01:00:00'),
('CANCELATION', 1, 5.00, '00:30:00'),
('NOSHOWUP', 1, 10.00, '00:00:00');

-- Insert data into `PricingStrategy` table
INSERT IGNORE INTO `smartParking`.`PricingStrategy` (`spot_type`, `ParkingLot_id`, `cost`, `congestion_added_percent`) VALUES
('REGULAR', 1, 2.50, 10.00),
('HANDICAP', 1, 3.50, 15.00),
('EV', 1, 5.00, 20.00),
('REGULAR', 2, 2.60, 12.00),
('HANDICAP', 2, 3.70, 17.00),
('EV', 2, 5.20, 22.00),
('REGULAR', 3, 2.70, 14.00),
('HANDICAP', 3, 3.90, 18.00),
('EV', 3, 5.40, 24.00),
('REGULAR', 4, 2.80, 16.00),
('HANDICAP', 4, 4.00, 20.00),
('EV', 4, 5.60, 25.00),
('REGULAR', 5, 2.90, 18.00),
('HANDICAP', 5, 4.10, 22.00),
('EV', 5, 5.80, 28.00);
-- Insert data into `FaultySpots` table
INSERT IGNORE INTO `smartParking`.`FaultySpots` (`id`, `ParkingSpot_id`, `ParkingLot_id`, `Driver_id`, `reason`, `time`) VALUES
(1, 2, 1, 1, 'EQUIPMENT_FAILURE', '02:00:00');

-- Insert data into `Violation` table
INSERT IGNORE INTO `smartParking`.`Violation` (`id`, `Driver_id`, `penality_type`, `LotManager_id`, `date_violated`) VALUES
(1, 1, 'OVERSTAY', 1, '2024-12-27 09:30:00');

-- Insert data into `Report` table
INSERT IGNORE INTO `smartParking`.`Report` (`id`, `ParkingLot_id`, `total_revenue`, `penality_income`, `num_of_violations`, `occupancy`, `date_generated`) VALUES
(1, 1, 250.00, 25.00, 2, 75.00, '2024-12-27 10:00:00');
