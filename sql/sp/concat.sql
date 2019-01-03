

DELIMITER //
DROP procedure if exists sp_getCountryFatalities2 //

CREATE PROCEDURE sp_getCountryFatalities2
(IN p_country VARCHAR(40), IN p_population BOOLEAN, IN p_year int(11), IN p_GDPperCap BOOLEAN)
BEGIN
	DECLARE param_year int(11);
	DECLARE s_population VARCHAR(100); 
    DECLARE s_GDPperCap VARCHAR(100);
    DECLARE s_macro_year VARCHAR(100);
		SET param_year = p_year;
		SET s_macro_year = '';
        SET s_population = '';
        SET s_GDPperCap = '';
        
	IF     p_GDPperCap = true THEN SET s_GDPperCap = '(SELECT country_id, gdp/population FROM macro as m_gdppop) JOIN';
    END IF;
    
    IF     param_year <> 0 THEN SET s_macro_year = ' and m.macro_year = param_year';
	END IF;

    IF     p_population = true THEN SET s_population = 'm.population,';
	END IF;
    
	SET @s=concat('select c.country_name, ', s_population, ' m.macro_year, m.country_id FROM country c, macro m 
    where c.country_id = m.country_id and IF(p_year = 0, m.macro_year, m.macro_year = p_year');
prepare stmt1 from @s;
execute stmt1;
deallocate prepare stmt1;
END //
DELIMITER ;
