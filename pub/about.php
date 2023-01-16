<?php
/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/
?>
<?php
//Includes header and menu to the website and checks weather a session is active to see if the user trying to access the site is logged in
    include("includes/head.php");
    include("includes/dropDown.php");

    if (!isset($_SESSION["admin"])) {
        header("Location: index.php?message=You have to be logged in to access the admin pages for this website!");
    }
?>

    
    <main>
        <div class="darkDiv">
            <h1>About Us</h1>
            <div id="aboutUs" class="longDiv">

            </div>
            <p class="success" id="message"></p>
            <form class="manageForms">

                <label for="titel">Titel : </label><br />
                <input placeholder="Enter a title" type="text" name="titel" id="titel"><br />

                <label for="info">Info : </label><br />
                <textarea rows="5" cols="50" name="info" id="info"
                    placeholder="Write here..."></textarea><br />

                <input id="addInfoBtn" class="loginBtn" type="submit" value="Add Info">
            </form>
        </div>

    </main>
    <?php
 //includes the footer to the website 
    include("includes/footer.php");
?>