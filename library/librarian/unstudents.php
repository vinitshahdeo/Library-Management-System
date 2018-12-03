<?php include('header.php'); ?>
<?php include('session.php'); ?>
<?php include('navbar_dasboard.php'); ?>
    <div class="container">
		<div class="margin-top">
			<div class="row">	
			<div class="span12">	
                            <table cellpadding="0" cellspacing="0" border="0" class="table  table-bordered" id="example">
                                <div class="alert alert-info">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong><i class="icon-user icon-large"></i>&nbsp;Unconfirmed Students Table</strong>
                                </div>
						
                                <thead>
                                    <tr>
                                        <th>Student_No</th>
                                        <th>Password</th>                                 
                                        <th>Name</th>                                 
                                        <th>Course</th>                                 
                                        <th>Gender</th>                                 
                                        <th>Address</th>                                 
                                        <th>Contact No</th>                                 
                                        <th>Photo</th>                                 
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
								 
                                  <?php  $user_query=mysql_query("select * from students where status = 'unactive' ")or die(mysql_error());
									while($row=mysql_fetch_array($user_query)){
									$id=$row['student_id'];  ?>
									<tr class="del<?php echo $id ?>">
                                    <td><?php echo $row['student_no']; ?></td> 
                                    <td><?php echo $row['password']; ?></td>                                 
                                    <td><?php echo $row['firstname']." ".$row['lastname']; ?></td>                                                                              
                                    <td><?php echo $row['course']; ?> </td> 
                                    <td><?php echo $row['gender']; ?></td> 
                                    <td><?php echo $row['address']; ?></td> 
                                    <td><?php echo $row['contact']; ?></td> 
                                    <td width="60"><img src="<?php echo $row['photo']; ?>" width="60" height="60"></td> 
									<?php include('toolttip_edit_delete.php'); ?>
                                    <td width="150">
											<a  href="#confirm<?php echo $id; ?>" data-toggle="modal" class="btn btn-success"><i class="icon-check"></i>&nbsp;Confirm Request</a>
											<?php include('confirm_request.php') ?>
                                    </td>
									
                                    </tr>
									<?php  }  ?>
                           
                                </tbody>
                            </table>
							
			
			</div>		
			</div>
		</div>
    </div>
<?php include('footer.php') ?>