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
        <h2>Hot beverages</h2>
        <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody id="hotDrinks">

</tbody>
</table>

<form method="POST" class="manageForms">
<p class="error" id="errMessage"></p>
<p class="success" id="message"></p>
    <h2>Add drink to menu</h2>

        <label for="hotName">Name : </label><br />
        <input type="text" name="hotName" placeholder="Enter name of drink" id="hotName"><br />
        <label for="hotPrice">Price : </label><br />
        <input type="number" name="hotPrice" placeholder="Enter a price the drink" id="hotPrice"><br />
        <input id="addHotBtn" class="loginBtn" type="submit" value="Add drink"><br />
        <a id="backToStart" class="loginBtn" href="admin.php">Back to previous page</a>
    </form>


</div>
    </main>

    <?php 
     //includes the footer to the website 
    include("includes/footer.php"); 
    ?>