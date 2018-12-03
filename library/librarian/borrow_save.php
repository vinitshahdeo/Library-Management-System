	<?php
 	include('dbcon.php');
	
		$id=$_POST['selector'];
 	$member_id  = $_POST['member_id'];
	$due_date  = $_POST['due_date'];

	if ($id == '' ){ 
	header("location: borrow.php");
	?>
	

	<?php }else{
	


	mysql_query("insert into borrow (member_id,date_borrow,due_date) values ('$member_id',NOW(),'$due_date')")or die(mysql_error());
	$query = mysql_query("select * from borrow order by borrow_id DESC")or die(mysql_error());
	$row = mysql_fetch_array($query);
	$borrow_id  = $row['borrow_id']; 
	

$N = count($id);
for($i=0; $i < $N; $i++)
{
	 mysql_query("insert borrowdetails (book_id,borrow_id,borrow_status) values('$id[$i]','$borrow_id','pending')")or die(mysql_error());

}
header("location: borrow.php");
}  
?>
	
	

	
	