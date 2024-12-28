SET GLOBAL event_scheduler = ON;

DELIMITER //

CREATE EVENT cancel_expired_reservations
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    UPDATE Reservation
    SET status = 'CANCELLED'
    WHERE status = 'RESERVED' 
      AND start_time <= NOW();
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER prevent_overlapping_reservations
BEFORE INSERT ON Reservation
FOR EACH ROW
BEGIN
    DECLARE conflicting_reservations INT;
    SELECT COUNT(*) INTO conflicting_reservations
    FROM Reservation
    WHERE parking_spot_id = NEW.parking_spot_id
      AND (
        (NEW.start_time BETWEEN start_time AND end_time) OR
        (NEW.end_time BETWEEN start_time AND end_time) OR
        (start_time BETWEEN NEW.start_time AND NEW.end_time)
      );

    IF conflicting_reservations > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Overlapping reservation detected!';
    END IF;
END //

DELIMITER ;

DELIMITER //

CREATE EVENT check_no_show_violations
ON SCHEDULE EVERY 1 MINUTE
DO
BEGIN
    INSERT INTO smartParking.Violation (Driver_id, penality_type, LotManager_id, date_violated)
    SELECT r.Driver_id, r.LotManager_id, NOW()
    FROM smartParking.Reservation r
    WHERE r.status = 'RESERVED' AND r.start_time < NOW();
END //

DELIMITER ;

CREATE INDEX idx_parking_spot_time ON Reservation (parking_spot_id, start_time, end_time);
CREATE INDEX idx_status_start_time ON Reservation (status, start_time);
