<?php 
include('dbcon.php');
if (isset($_POST['submit'])){
$id=$_POST['id'];
$firstname=$_POST['firstname'];
$lastname=$_POST['lastname'];
$gender=$_POST['gender'];
$address=$_POST['address'];
$contact=$_POST['contact'];
$type=$_POST['type'];
$year_level=$_POST['year_level'];



mysql_query("update member set firstname='$firstname',lastname='$lastname',gender='$gender',address = '$address',contact = '$contact',type = '$type',year_level = '$year_level' where member_id='$id'")or die(mysql_error());
								
								
header('location:students.php');
}
?>	