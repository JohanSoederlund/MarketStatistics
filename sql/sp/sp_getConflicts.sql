DELIMITER //
DROP procedure if exists sp_getConflicts //
CREATE PROCEDURE sp_getConflicts
(IN p_country VARCHAR(40), IN p_year int(11))
BEGIN
    select c.country_name 'country', Date_FORMAT(c2.conflict_date, '%Y-%m-%d') 'date', c2.fatalities,  
    c2.event_type 'conflict event', c2.actor1 'actor1', c2.actor2 'actor2', c2.location 'location',
    m.population
    
FROM Country c, Conflict c2, Macro m

WHERE c.country_id = c2.country_id and m.country_id = c2.country_id

and m.macro_year = c2.conflict_year

AND IF(p_country = '*', c.country_name LIKE '%', c.country_name = p_country)

AND IF(p_year = 0, c2.conflict_year , c2.conflict_year = p_year)


GROUP BY c2.country_id, c.country_name, c2.conflict_year, m.population, c2.fatalities, c2.conflict_date,
c2.event_type , c2.actor1 , c2.actor2 , c2.location 
ORDER BY c.country_name, c2.conflict_year, c2.fatalities DESC;

END //
DELIMITER ;
