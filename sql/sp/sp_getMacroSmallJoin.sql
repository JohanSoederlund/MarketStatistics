DELIMITER //
DROP procedure if exists sp_getMacroSmallJoin //
CREATE PROCEDURE sp_getMacroSmallJoin
(IN p_country VARCHAR(40), IN p_year int(11))
BEGIN
	SELECT DISTINCT c.country_name 'country', c2.conflict_year 'year', 
    SUM(c2.fatalities) AS 'sum fatalities', Cast(ROUND(m.population/1000) as char) 'population / T'

    
FROM Conflict c2
inner join  Macro m
ON m.country_id = c2.country_id and m.macro_year = c2.conflict_year
inner join  Country c
ON c.country_id = c2.country_id AND IF(p_country = '*', c.country_name LIKE '%', c.country_name = p_country)

WHERE 

IF(p_year = 0, c2.conflict_year , c2.conflict_year = p_year)
 
GROUP BY c2.country_id, c.country_name, c2.conflict_year, m.population
ORDER BY c.country_name, c2.conflict_year;

END //
DELIMITER ;