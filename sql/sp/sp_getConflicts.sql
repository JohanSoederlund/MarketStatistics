DELIMITER //
DROP PROCEDURE IF EXISTS sp_getConflicts //
CREATE PROCEDURE sp_getConflicts
(IN p_country VARCHAR(40), IN p_year int(11), IN p_actor VARCHAR(100))
BEGIN
    SELECT DISTINCT 
		c2.conflict_id, c.country_name 'country', 
		Date_FORMAT(c2.conflict_date, '%Y-%m-%d') 'date', c2.fatalities,  
		c2.event_type 'conflict event', a1.actor_name 'agressing actor', 
        a2.actor_name 'receiving actor', c2.location 'location'
    
	FROM 
		Country c, Conflict c2 
		INNER JOIN Actor a1
			ON a1.conflict_id = c2.conflict_id AND a1.agressor = 1 
			AND IF(p_actor = '*', a1.actor_name LIKE '%', a1.actor_name LIKE CONCAT('%', p_actor, '%'))
		INNER JOIN Actor a2
			ON a2.conflict_id = c2.conflict_id AND a2.agressor = 0

	WHERE 
		c.country_id = c2.country_id
		AND IF(p_country = '*', c.country_name LIKE '%', c.country_name = p_country)
		AND IF(p_year = 0, c2.conflict_year , c2.conflict_year = p_year)

	GROUP BY c2.conflict_id, c2.country_id, c.country_name, c2.conflict_year, 
			c2.fatalities, c2.conflict_date, c2.event_type , 
			a1.actor_name,  a1.agressor, a2.actor_name,  a2.agressor, c2.location 
			
	ORDER BY c.country_name, c2.fatalities DESC;
END //
DELIMITER ;
