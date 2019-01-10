SELECT  country_id, DATE_FORMAT(conflict_date, '%Y'), SUM(fatalities) AS total
	   FROM   conflict 
	   GROUP BY country_id, DATE_FORMAT(conflict_date, '%Y')
	   ORDER BY country_id
		   
	/*	   
INSERT INTO OrderDetails (country_id, ProductID, Quantity)
VALUES (10248,11,5);
		*/   
		   
SELECT DISTINCT totals.country_id, totals.country_id, totals.total
FROM   conflict,
       (
           SELECT country_id, DATE_FORMAT(conflict_date, '%Y'),
                  SUM(fatalities) AS total
           FROM   conflict
           WHERE country_id = 10248
           GROUP BY ProductID
       ) AS totals
  WHERE   conflict.country_id = totals.country_id;	 