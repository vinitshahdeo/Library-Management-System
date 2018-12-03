<?php
include('dbcon.php');

$id=$_GET['id'];

mysql_query("delete from users where user_id='$id'") or die(mysql_error());

header('location:users.php');
?>