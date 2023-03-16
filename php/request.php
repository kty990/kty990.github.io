<!-- Request a project, used once the user is signed in -->
<!-- id, status, cost, description -->
<!-- id, status cannot be modified by the user, only by admin if required through the admin portal which has yet to be developed -->

<?php

$myGetArgs = filter_input_array(INPUT_GET);
$myPostArgs = filter_input_array(INPUT_POST); // using this
//htmlspecialchars($string, ENT_QUOTES, 'UTF-8');

// connect to database
$mysqli = new mysqli("localhost","root","","users");

$query = "SELECT * FROM requests WHERE id = '$id'";

$result = $mysqli->query($query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        echo $result; // JSON encode possibly required here
    } else {
        echo '404 not found';
    }
} else {
    echo 'Error: ' . mysqli_error();
}

// close connection
mysqli_close($mysqli);

?>
