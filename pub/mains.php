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
        
<h2>Mains</h2>
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
    <tbody id="mains">

</tbody>
</table>


<form  method="POST" class="manageForms">
<p class="error" id="errMessage"></p>
<p class="success" id="message"></p>
    <h2>Add Main to menu</h2>
        <label for="mainName">Name of main : </label>
        <input type="text" name="mainName" placeholder="Enter name of main" id="mainName">
        <label for="mainDescription">Description : </label>
        <input type="text" name="mainDescription" placeholder="Describe the main" id="mainDescription">
        <label for="mainPrice">Price : </label>
        <input type="number" name="mainPrice" placeholder="Enter a price for the main" id="mainPrice">
        <input id="addMainBtn" class="loginBtn" type="submit" value="Add main"><br />
        <a id="backToStart" class="loginBtn" href="admin.php">Back to previous page</a>
    </form>
</div>

    </main>

    <?php 
     //includes the footer to the website 
    include("includes/footer.php"); 
    ?>
