								<?php
								include('dbcon.php');
								if (isset($_POST['login'])){
								session_start();
								$student_no = $_POST['student_no'];
								$password = $_POST['password'];
								$query = "SELECT * FROM students WHERE student_no='$student_no' AND password='$password' and status = 'active' ";
								$result = mysql_query($query)or die(mysql_error());
								$num_row = mysql_num_rows($result);
									$row=mysql_fetch_array($result);
									if( $num_row > 0 ) {
										header('location:dasboard.php');
								$_SESSION['id']=$row['student_id'];
									}
									else{ 
								header('location:access_denied.php');
								}}
								?>