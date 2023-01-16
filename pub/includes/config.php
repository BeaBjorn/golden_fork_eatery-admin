<?php
/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/
?>
<?php 
//activates a session-variable
    session_start();
//devmode for error reporting
    $devmode = false;

    if($devmode){
        error_reporting(-1);
        ini_set("display_errors", 1);
    }
?>