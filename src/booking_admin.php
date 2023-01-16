
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
    <h1>Manage Bookings</h1>

        <div class="darkDiv">
        <h2>Current Bookings</h2>
        <table class="bookingTable">
        <thead>
        <tr>
            <th>Firstname</th>
            <th>Surname</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Number of guests</th>
            <th>Time</th>
            <th>Date</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody id="bookings">

</tbody>
</table>

<form method="POST" class="manageForms">
<p class="success" id="message"></p>

    <h2>Add new booking</h2>
    <label for="fName">Firstname : </label><br />
        <input type="text" name="fName" id="fName">

        <label for="sName">Surname : </label><br />
        <input type="text" name="sName" id="sName"><br />

        <label for="phoneNumber"> Phone number  : </label><br />
        <input type="text" name="phoneNumber" id="phoneNumber"><br />

        <label for="email">Email : </label><br />
        <input type="text" name="email" id="email"><br />

        <label for="numberOfGuests">Number of guests : </label><br />
        <input type="number" name="numberOfGuests" id="numberOfGuests"><br />

        <label for="time">Time for booking : </label><br />
        <input type="time" name="time" id="time"><br />

        <label for="date">Date for booking : </label><br />
        <input type="date" name="date" id="date"><br />
        <p class="agree">I agree that the information above is stored in a database</p>
        <label for="agree">Agree</label><input type="checkbox" name="agree" id="agree"><br />

        <p class="error" id="errMessage"></p>

        <input id="addBookingBtn" class="loginBtn" type="submit" value="Add Booking"><br />
        <a id="backToStart" class="loginBtn" href="admin.php">Back to previous page</a>
    </form>
    </div>
    </main>
    <?php 
     //includes the footer to the website 
    include("includes/footer.php"); 
    ?>