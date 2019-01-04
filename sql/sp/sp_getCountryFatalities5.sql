DELIMITER //
DROP procedure if exists sp_getCountryFatalities5 //
CREATE PROCEDURE sp_getCountryFatalities5
(IN p_country VARCHAR(40), IN p_year int(11))
BEGIN
	select DISTINCT c.country_name 'country', sum_fatalities, m.macro_year 'year', m.gdp / m.population 'GDP/cap', (sum_fatalities / m.population) 'fatalities/cap', (sum_fatalities / m.gdp) 'fatalities/gdp'
from country c, macro m, conflict c2, 

(SELECT DISTINCT
        country_id, SUM(fatalities) AS sum_fatalities
    FROM
        conflict
	WHERE 
		
		IF(p_year = 0, conflict_date , DATE_FORMAT(conflict_date, '%Y') = p_year)
    GROUP BY country_id) AS c3

where c.country_id = c2.country_id and c.country_id = m.country_id and c.country_id = c3.country_id 
and IF(p_country = '*', c.country_name LIKE '%', c.country_name = p_country)
and IF(p_year = 0, m.macro_year , m.macro_year = p_year)
ORDER BY (sum_fatalities / m.gdp) DESC;
END //
DELIMITER ;