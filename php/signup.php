<?php

// connect to database
$mysqli = new mysqli("localhost","root","","users");

$query = "SELECT * FROM data WHERE email = '$email'";

$result = $mysqli->query($query);

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        echo 'found!';
    } else {
        echo 'not found';
    }
} else {
    echo 'Error: ' . mysqli_error();
}

// close connection
mysqli_close($mysqli);

?>
