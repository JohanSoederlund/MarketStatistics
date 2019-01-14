DELIMITER //
DROP PROCEDURE IF EXISTS sp_getMacro //
CREATE PROCEDURE sp_getMacro
(IN p_country VARCHAR(40), IN p_year int(11))
BEGIN
	SELECT DISTINCT 
		c.country_name 'country', c2.conflict_year 'year', SUM(c2.fatalities) AS 'sum fatalities', 
		Cast(ROUND(m.population/1000) as char) 'population / T', ROUND(m.gdp / m.population) 'GDP/cap US$', 
        ((SUM(c2.fatalities)) * 1000 / m.population) '(fatalities/cap) * 1T', 
		((SUM(c2.fatalities)) * 1000000 / m.gdp ) '(fatalities/gdp) * 1M'
    
	FROM 
		Country c, Conflict c2, Macro m

	WHERE 
		c.country_id = c2.country_id and m.country_id = c2.country_id
		and m.macro_year = c2.conflict_year
		AND IF(p_country = '*', c.country_name LIKE '%', c.country_name = p_country)
		AND IF(p_year = 0, c2.conflict_year , c2.conflict_year = p_year)

	GROUP BY c2.country_id, c.country_name, c2.conflict_year, m.population, m.gdp
	
    ORDER BY c.country_name, c2.conflict_year;
END //
DELIMITER ;