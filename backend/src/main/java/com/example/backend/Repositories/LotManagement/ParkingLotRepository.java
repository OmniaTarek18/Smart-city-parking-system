package com.example.backend.Repositories.LotManagement;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.ParkingLotDTO;
import com.example.backend.DTOs.Point;

@Repository
public class ParkingLotRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ParkingLotDTO> findByOwnerId(int ownerId) {
        String sql = "select id, name, st_x(location) as latitude, st_y(location) as longitude, " +
                     "capacity_regular, capacity_handicap, capacity_ev, owner_id " +
                     "from ParkingLot where owner_id = ?";
        return jdbcTemplate.query(sql, this::mapToParkingLot, ownerId);
    }

    public void save(ParkingLotDTO parkingLot) {
        String sql = "insert into ParkingLot (id, name, location, capacity_regular, capacity_handicap, capacity_ev, owner_id) " +
                     "values (?, ?, point(?,?), ?, ?, ?, ?)";
        jdbcTemplate.update(sql, 
            parkingLot.id(), 
            parkingLot.name(), 
            parkingLot.location().latitude(), 
            parkingLot.location().longitude(),
            parkingLot.capacity_regular(), 
            parkingLot.capacity_handicap(), 
            parkingLot.capacity_ev(), 
            parkingLot.owner_id());
    }

    public void update(ParkingLotDTO parkingLot) {
        String sql = "update ParkingLot set name = ?, location = point(?, ?), capacity_regular = ?, " +
                     "capacity_handicap = ?, capacity_ev = ?, owner_id = ? where id = ?";
        jdbcTemplate.update(sql, 
            parkingLot.name(), 
            parkingLot.location().latitude(), 
            parkingLot.location().longitude(),
            parkingLot.capacity_regular(), 
            parkingLot.capacity_handicap(), 
            parkingLot.capacity_ev(), 
            parkingLot.owner_id(), 
            parkingLot.id());
    }

    public void delete(int id) {
        String sql = "delete from ParkingLot where id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void adjustLotCapacity(int parkingLotId, String type, int adjustment) {
        String sql = "update ParkingLot set capacity_" + type.toLowerCase() + " = capacity_" + type.toLowerCase() + " + ? where id = ?";
        jdbcTemplate.update(sql, adjustment, parkingLotId);
    }

    private ParkingLotDTO mapToParkingLot(ResultSet rows, int rowNum) throws SQLException {
        return new ParkingLotDTO(
                rows.getInt("id"),
                rows.getString("name"),
                new Point(
                    rows.getDouble("latitude"),
                    rows.getDouble("longitude")
                ),
                rows.getInt("capacity_regular"),
                rows.getInt("capacity_handicap"),
                rows.getInt("capacity_ev"),
                rows.getInt("owner_id")
        );
    }
}
