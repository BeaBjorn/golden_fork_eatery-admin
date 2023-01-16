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
    <h1>Manage Menu</h1>
        <div class="darkDiv">
        <h2>Appetizers</h2>
        <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody id="appetizers">

</tbody>
</table>

<form method="POST" class="manageForms">
<p class="error" id="errMessage"></p>
<p class="success" id="message"></p>
    <h2>Add appetizer to menu</h2>

        <label for="appName">Name of appetizer : </label><br />
        <input type="text" name="appName" placeholder="Enter name of appetizer" id="appName"><br />
        <label for="appDescription">Description : </label><br />
        <input type="text" name="appDescription" placeholder="Describe the appetizer" id="appDescription"><br />
        <label for="appPrice">Price : </label><br />
        <input type="number" name="appPrice" placeholder="Enter a price the appetizer" id="appPrice"><br />
        <input id="addAppBtn" class="loginBtn" type="submit" value="Add appetizer"><br />
        <a id="backToStart" class="loginBtn" href="admin.php">Back to previous page</a>
    </form>


</div>
    </main>

    <?php 
     //includes the footer to the website 
    include("includes/footer.php"); 
    ?>
