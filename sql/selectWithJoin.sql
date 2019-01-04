SELECT
	c1.country_name, c1.country_id, gdp, m1.macro_year, m1.population, m1.country_id
from 
    country c1
		JOIN
	(SELECT 
		gdp, macro_year, population, country_id
	FROM 
		macro
	WHERE
		gdp = 0) AS m1
WHERE 
	c1.country_id = m1.country_id
ORDER BY c1.country_name;
    