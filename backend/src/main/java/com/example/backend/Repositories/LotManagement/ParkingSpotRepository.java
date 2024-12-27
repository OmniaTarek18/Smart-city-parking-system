package com.example.backend.Repositories.LotManagement;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.ParkingSpotDTO;
import com.example.backend.Enums.SpotType;
import com.example.backend.Enums.SpotStatus;

@Repository
public class ParkingSpotRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<ParkingSpotDTO> findByParkingLotId(int parkingLotId) {
        String sql = "select id, ParkingLot_id, type, status from ParkingSpot where ParkingLot_id = ?";
        return jdbcTemplate.query(sql,this::mapToParkingSpot,parkingLotId);
    }

    public void save(ParkingSpotDTO parkingSpot) {
        String sql = "insert into ParkingSpot (id, ParkingLot_id, type, status) values (?, ?, ?, ?)";
        jdbcTemplate.update(sql, parkingSpot.id(), parkingSpot.ParkingLot_id(),
                parkingSpot.type().toString(), parkingSpot.status().toString());
    }

    public void deleteByParkingLotId(int parkingLotId) {
        String sql = "delete from ParkingSpot where ParkingLot_id = ?";
        jdbcTemplate.update(sql,parkingLotId);
    }

    public int findMaxIdForLot(int parkingLotId) {
        //retrieve the max id of the parking spots in lot if there are no rows in the ParkingSpot table the method returns 0
        //max function returns null if there are no matching rows 
        //so we use coalesce(max(id), 0) which ensure that the query always returns a non null value
        String sql = "select coalesce(max(id), 0) from ParkingSpot where ParkingLot_id = ?";
        return jdbcTemplate.queryForObject(sql,Integer.class,parkingLotId);
    }

    public int countByTypeAndParkingLotId(SpotType type, int parkingLotId) {
        String sql = "select count(*) from ParkingSpot where type = ? and ParkingLot_id = ?";
        return jdbcTemplate.queryForObject(sql,Integer.class,type.toString(),parkingLotId);
    }

    // this method is used in case of updating alot with a capcity less than the old one in case of deactivating many lots in single step
    public void deleteExcessSpots(int parkingLotId, SpotType type, int excessCount) {
        // getting the ids to delete
        String selectSql = "select id from ParkingSpot where ParkingLot_id = ? and type = ? " +
                "order by id desc limit ?";
        List<Integer> idsToDelete = jdbcTemplate.queryForList(selectSql, Integer.class, parkingLotId, type.toString(),
                excessCount);
        // delete the selected ids
        if (!idsToDelete.isEmpty()) {
            String deleteSql = "delete from ParkingSpot where id in (" +
                    String.join(",", idsToDelete.stream().map(id -> "?").toArray(String[]::new)) +
                    ")";

            jdbcTemplate.update(deleteSql, idsToDelete.toArray());
        }
    }

    public void updateByLotAndSpotId(ParkingSpotDTO parkingSpot, int parkingLotId, int spotId) {
        String sql = "update ParkingSpot set type = ?, status = ? where ParkingLot_id = ? and id = ?";
        jdbcTemplate.update(sql, 
            parkingSpot.type().toString(), 
            parkingSpot.status().toString(), 
            parkingLotId, 
            spotId);
    }

    private ParkingSpotDTO mapToParkingSpot(ResultSet rows, int rowNum) throws SQLException {
        return new ParkingSpotDTO(
                rows.getInt("id"),
                rows.getInt("ParkingLot_id"),
                SpotType.valueOf(rows.getString("type")),
                SpotStatus.valueOf(rows.getString("status")));
    }

    public int countOccupiedSpots(int parkingLotId, SpotType type) {
        String sql = "select count(*) from ParkingSpot where ParkingLot_id = ? and type = ? and status = 'OCCUPIED'";
        return jdbcTemplate.queryForObject(sql, Integer.class, parkingLotId, type.name());
    }

}
