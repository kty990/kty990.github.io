<!-- Request a project, used once the user is signed in -->
<!-- id, status, cost, description -->

<?php

$myGetArgs = filter_input_array(INPUT_GET);
$myPostArgs = filter_input_array(INPUT_POST);
// $myServerArgs = filter_input_array(INPUT_SERVER);
// $myCookieArgs = filter_input_array(INPUT_COOKIE);

// connect to database
$mysqli = new mysqli("localhost","root","","users");

$query = "SELECT * FROM requests WHERE id = '$id'";

$result = $mysqli->query($query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        echo $result;
    } else {
        echo '404 not found';
    }
} else {
    echo 'Error: ' . mysqli_error();
}

// close connection
mysqli_close($mysqli);

?>
