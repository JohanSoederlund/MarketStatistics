
ALTER TABLE conflict DROP INDEX idx_conflict;

CREATE INDEX idx_conflict
ON conflict (country_id, fatalities, conflict_year);



ALTER TABLE conflict DROP INDEX idx_macro;

CREATE INDEX idx_macro
ON macro (country_id, population, gdp);

