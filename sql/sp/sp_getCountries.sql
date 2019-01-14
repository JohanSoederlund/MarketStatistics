DELIMITER //
DROP PROCEDURE IF EXISTS sp_getMacroSmall //
CREATE PROCEDURE sp_getCountries
()
BEGIN
	SELECT DISTINCT
		c1.country_name
        
	FROM
		Country c1
			INNER JOIN
			(SELECT 
				macro_year, population, country_id
			FROM
				Macro) AS u1
                
	WHERE
		c1.country_id = u1.country_id;
END //
DELIMITER ;

