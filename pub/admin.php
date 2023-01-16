
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
        <div class="greenAdminBlocks">
        <h1>The Golden Fork Eatery Admin</h1>
        <a href="booking_admin.php">
                <div class="greenAdminBlock">
                    <h2>Manage Reservations</h2>
                </div>
            </a><br />
            <a href="appetizers.php">
                <div class="greenAdminBlock">
                    <h2>Manage Appetizers</h2>
                </div>
            </a><br />
            <a href="mains.php">
                <div class="greenAdminBlock">
                    <h2>Manage Mains</h2>
                </div>
            </a><br />
            <a href="desserts.php">
                <div class="greenAdminBlock">
                    <h2>Manage Desserts</h2>
                </div>
            </a><br />
            <a href="alcohol.php">
                <div class="greenAdminBlock">
                    <h2>Manage alcoholic beverages</h2>
                </div>
            </a><br />
            <a href="noAlcohol.php">
                <div class="greenAdminBlock">
                    <h2>Manage non alcoholic beverages</h2>
                </div>
            </a><br />
            <a href="hotDrinks.php">
                <div class="greenAdminBlock">
                    <h2>Manage hot beverages</h2>
                </div>
            </a><br />
            <a href="about.php">
                <div class="greenAdminBlock">
                    <h2>Update information page</h2>
                </div>
            </a><br />
            <a href="logout.php">
                <div class="greenAdminBlock">
                    <h2>Log Out</h2>
                </div>
            </a><br />
        </div>

    </main>
<?php
 //includes the footer to the website 
    include("includes/footer.php");
?>