DELIMITER //
DROP PROCEDURE IF EXISTS sp_getActorCountry //
CREATE PROCEDURE sp_getActorCountry
(IN p_country VARCHAR(40), IN p_actor VARCHAR(100))
BEGIN
    SELECT DISTINCT 
		c.country_name 'country', a1.actor_name 'conflict actor'
    
	FROM 
		Conflict c2
		INNER JOIN Actor a1
			ON a1.conflict_id = c2.conflict_id 
			AND IF(p_actor = '*', a1.actor_name LIKE '%', a1.actor_name LIKE CONCAT('%', p_actor, '%'))
		INNER JOIN Country c
			ON c.country_id = c2.country_id 
			AND IF(p_country = '*', c.country_name LIKE '%', c.country_name LIKE CONCAT('%', p_country, '%'))

	GROUP BY
		c2.conflict_id, c.country_name, a1.actor_name 
    
	ORDER BY 
		c.country_name, a1.actor_name DESC;
END //
DELIMITER ;
