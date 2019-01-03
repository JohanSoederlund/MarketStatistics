DELIMITER //
DROP procedure if exists sp_getCountryFatalities2 //
CREATE PROCEDURE sp_getCountryFatalities2
(IN p_country VARCHAR(40), IN p_year int(11))
BEGIN
	select c.country_name 'country', c2.fatalities 'fatalities', m.macro_year 'year', m.gdp / m.population 'GDP/cap'
from country c, macro m, conflict c2
where c.country_id = c2.country_id and c.country_id = m.country_id 
and IF(p_country = '*', c.country_name, c.country_name = p_country)
and IF(p_year = 0, m.macro_year, m.macro_year = p_year);
END //
DELIMITER ;