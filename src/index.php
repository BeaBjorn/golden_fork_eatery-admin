<?php
/*
Created by : Beatrice Bjorn
For : Project - Restaurant - webbutveckling III, DT173G
Last updated : 2022-08-21
*/
?>
<?php
//includes the head for the website
    include("includes/head.php");
//Checks if a user is logged in
if (isset($_SESSION["admin"])) {
    header("Location: admin.php");
}

//If the form bellow is sent the code in this php-block will run. 
if (isset($_POST['username'])) {
//The username and password sent in the form gets stored in variables
    $username = $_POST['username'];
    $password = $_POST['password'];

 //An if-statement that cheack weather both fields in the form has been filled, if not an error message is returned
    if (empty($username) || empty($password)) {
        $errormsg = "<p class='error'><strong>Enter both username and password to log in!</strong></p>";
    } else {

//If both fields have been filled cURL is used to check weather the user is stored in the database
//A new cURL session i started
        $url = 'https://studenter.miun.se/~bebj2100/writeable/projekt_webservice_vt22-BeaBjorn//api/rest_admin.php';
        $curl = curl_init();
//the variable "user" stores an array with the username and password entered
        $user = array("username" => $username, "password" => $password);
//The array above is converted to json-format
        $json_string = json_encode($user);
//Settings for cURL
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $json_string);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
//Response-codes and responses
        $data = json_decode(curl_exec($curl), true);
        $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        
//If the username and the password exists in the database the response code 200 in returned, a session variable for admin is activated and 
//the user gets sent to admin.php
        if($httpcode === 200) {
            $_SESSION['admin'] = $username;
            header("Location: admin.php");
        } else {
//if the user does not exist in te database the user gets an error message stating that the username or password entered was incorrect            
            $errormsg = "<p class='error'><b>Incorrect username or password!</b></p>";
        }
    }
}
?>

<div class="greenAdminBlocks">
        <h1 class="h1Login">The Golden Fork Eatery Admin</h1>

            <form action="index.php" method="post" class="loginForm">

            <h2>Log in!</h2>
<!-- The php-block below cheack if any error messages has been sent and prints these on the screen if there are any -->            
            <?php
                if (isset($errormsg)) {
                    echo $errormsg;
                }
                if(isset($_GET['message'])){
                    echo "<p class='error'>" . $_GET['message'] . "</p>";
                }
            ?>
                <label for="username">Username : </label><br />
                <input type="text" placeholder="Your username" name="username" id="username"><br />
                <label for="password">Password : </label><br />
                <input type="password" name="password" placeholder="Your password" id="password"><br />
                <input class="loginBtn" type="submit" value="Log In">
            </form>

            </div>

<?php
 //includes the footer to the website 
    include("includes/footer.php");
?>