DELIMITER //
DROP procedure if exists createIndex //
CREATE PROCEDURE createIndex()
BEGIN

	CREATE INDEX idx_conflict
	ON Conflict (country_id, fatalities, conflict_year);

	CREATE INDEX idx_macro
	ON Macro (country_id, population, gdp);
    
END //
DELIMITER ;