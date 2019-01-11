
    
CALL sp_getMacroSmall('Angola', 0);
CALL sp_getMacroSmall('Angola', 1997);
CALL sp_getMacroSmall('*', 1997);
CALL sp_getMacroSmall('*', 0);


CALL sp_getMacro('Angola', 0);
CALL sp_getMacro('Angola', 1997);
CALL sp_getMacro('*', 1997);
CALL sp_getMacro('*', 0);

CALL sp_getCountries();

CALL sp_getConflicts('Angola', 1997);