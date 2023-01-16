<?php
/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/
?>

<?php 
//destroys the session variable and sends the user to index.php (login form)
    session_start();
    session_unset();
    session_destroy();

    header("location: index.php");
  
    exit();
?>