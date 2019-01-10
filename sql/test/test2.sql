DELIMITER //
DROP procedure if exists sp_test2 //
CREATE PROCEDURE sp_test2
(IN p_country VARCHAR(40), IN p_year int(11))
BEGIN
	SELECT DISTINCT c.country_name 'country', sum_fatalities, m.population 'population', m.macro_year 'macro_year'
FROM country c, macro m, conflict c2, 


(SELECT DISTINCT
        country_id, SUM(fatalities) AS sum_fatalities, DATE_FORMAT(conflict_date, '%Y') AS 'conflict_year'
    FROM
        conflict
	WHERE 
		
		IF(p_year = 0, conflict_date , DATE_FORMAT(conflict_date, '%Y') = p_year)
    GROUP BY country_id, 'conflict_year') AS c3

WHERE c.country_id = c2.country_id and c.country_id = m.country_id
AND IF(p_country = '*', c.country_name LIKE '%', c.country_name = p_country)
AND IF(p_year = 0, m.macro_year , m.macro_year = p_year)
ORDER BY (sum_fatalities * 1000 / m.gdp) DESC;
END //
DELIMITER ;


CALL sp_test2('Angola', 0);