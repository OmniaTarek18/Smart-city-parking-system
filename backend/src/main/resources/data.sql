-- Insert data into `User` table
INSERT IGNORE INTO `smartParking`.`User` (`id`, `email`, `password`, `role`) VALUES
(1, 'admin@example.com', 'adminpass', 'SystemAdmin'),
(2, 'manager@example.com', 'managerpass', 'LotManager'),
(3, 'driver@example.com', 'driverpass', 'Driver');

-- Insert data IGNORE INTO `LotManager` table
INSERT IGNORE INTO `smartParking`.`LotManager` (`id`, `User_id`, `name`, `phone_number`) VALUES
(1, 2, 'John Doe', '555-1234');

-- Insert data IGNORE INTO `Driver` table
INSERT IGNORE INTO `smartParking`.`Driver` (`id`, `User_id`, `name`, `phone_number`, `license_plate_number`, `card_no`, `cvv`, `card_expiry_date`) VALUES
(1, 3, 'Alice Smith', '555-5678', 'ABC123', '4111111111111111', '123', '2025-12-01');

-- Insert data IGNORE INTO `ParkingLot` table
INSERT IGNORE INTO `smartParking`.`ParkingLot` (`id`, `name`, `location`, `capacity`, `owner_id`) VALUES
(1, 'Downtown Parking', ST_GeomFromText('POINT(40.712776 -74.005974)'), 100, 1);

-- Insert data IGNORE INTO `ParkingSpot` table
INSERT IGNORE INTO `smartParking`.`ParkingSpot` (`id`, `ParkingLot_id`, `type`, `status`) VALUES
(1, 1, 'REGULAR', 'AVAILABLE'),
(2, 1, 'HANDICAP', 'OCCUPIED'),
(3, 1, 'EV', 'RESERVED');

-- Insert data IGNORE INTO `Reservation` table
INSERT IGNORE INTO `smartParking`.`Reservation` (`id`, `Driver_id`, `ParkingSpot_id`, `ParkingLot_id`, `duration`, `start_time`, `status`, `price`) VALUES
(1, 1, 1, 1, '01:30:00', '2024-12-27 08:00:00', 'ACTIVE', 10.00);

-- Insert data IGNORE INTO `ReservationRules` table
INSERT IGNORE INTO `smartParking`.`ReservationRules` (`LotManager_id`, `time_limit`) VALUES
(1, '02:00:00');

-- Insert data IGNORE INTO `PenalityRules` table
INSERT IGNORE INTO `smartParking`.`PenalityRules` (`penality_type`, `LotManager_id`, `cost`, `time`) VALUES
('OVERSTAY', 1, 20.00, '01:00:00'),
('CANCELATION', 1, 5.00, '00:30:00'),
('NOSHOWUP', 1, 10.00, '00:00:00');

-- Insert data IGNORE INTO `PricingStrategy` table
INSERT IGNORE INTO `smartParking`.`PricingStrategy` (`spot_type`, `ParkingLot_id`, `cost`, `congestion_added_percent`) VALUES
('REGULAR', 1, 2.50, 10.00),
('HANDICAP', 1, 3.50, 15.00),
('EV', 1, 5.00, 20.00);

-- Insert data IGNORE INTO `FaultySpots` table
INSERT IGNORE INTO `smartParking`.`FaultySpots` (`id`, `ParkingSpot_id`, `ParkingLot_id`, `Driver_id`, `reason`, `time`) VALUES
(1, 2, 1, 1, 'EQUIPMENT_FAILURE', '02:00:00');

-- Insert data IGNORE INTO `Violation` table
INSERT IGNORE INTO `smartParking`.`Violation` (`id`, `Driver_id`, `penality_type`, `LotManager_id`, `date_violated`) VALUES
(1, 1, 'OVERSTAY', 1, '2024-12-27 09:30:00');

-- Insert data IGNORE INTO `Report` table
INSERT IGNORE INTO `smartParking`.`Report` (`id`, `ParkingLot_id`, `total_revenue`, `penality_income`, `num_of_violations`, `occupancy`, `date_generated`) VALUES
(1, 1, 250.00, 25.00, 2, 75.00, '2024-12-27 10:00:00');
