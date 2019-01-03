DELIMITER //
CREATE PROCEDURE sp_getCountries
()
BEGIN
  SELECT DISTINCT
    c1.country_name
FROM
    country c1
        INNER JOIN
    (SELECT 
        macro_year, population, country_id
    FROM
        macro) AS u1
WHERE
    c1.country_id = u1.country_id;
END //
DELIMITER ;

