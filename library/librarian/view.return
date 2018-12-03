<?php include('header.php'); ?>
<?php include('session.php'); ?>
<?php include('navbar_books.php'); ?>
    <div class="container">
		<div class="margin-top">
			<div class="row">	
			<div class="span12">	
			   <div class="alert alert-info">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong><i class="icon-user icon-large"></i>&nbsp;Return Table</strong>
                                </div>
						
		
		<?php include ('returnname.php'); ?>
							
                            <table cellpadding="0" cellspacing="0" border="0" class="table  table-bordered" id="example">
                             
								<p><a href="add_books.php" class="btn btn-success"><i class="icon-plus"></i>&nbsp;Add Books</a></p>
							
                                <thead>
                                    <tr>
                       
                                        <th>Book_title</th>                                 
                                        <th>Category</th>
										<th>Author</th>
										<th>Book_copies</th>
										<th>Book_pub</th>
										<th>Publisher_name</th>
										<th>ISBN</th>
										<th>Copyright_year</th>
									
										<th>Date_added</th>
										<th>status</th>
										<th>Action</th>
										
                                    </tr>
                                </thead>
                                <tbody>
								 
                                  <?php  $user_query=mysql_query("select * from book")or die(mysql_error());
									while($row=mysql_fetch_array($user_query)){
									$id=$row['book_id'];  
									$cat_id=$row['category_id'];

											$cat_query = mysql_query("select * from category where category_id = '$cat_id'")or die(mysql_error());
											$cat_row = mysql_fetch_array($cat_query);
									?>
									<tr class="del<?php echo $id ?>">
									
									                              
                                    <td><?php echo $row['book_title']; ?></td>
									<td width="80"><?php echo $cat_row ['classname']; ?> </td> 
									
                                    <td width="80"><?php echo $row['author']; ?> </td> 
                                    <td width="80"><?php echo $row['book_copies']; ?> </td>
                                     <td width="8"><?php echo $row['book_pub']; ?></td>
									 <td width="8"><?php echo $row['publisher_name']; ?></td>
									 <td width="80"><?php echo $row['isbn']; ?></td>
									 <td width="80"><?php echo $row['copyright_year']; ?></td>
		
									 <td width="80"><?php echo $row['date_added']; ?></td>
									  <td width=""><?php echo $row['status']; ?></td> 
									<?php include('toolttip_edit_delete.php'); ?>
                                    <td width="90">
                                        <a rel="tooltip"  title="Delete"  href="#delete_book<?php echo $id; ?>" data-toggle="modal"    class="btn btn-info"><i class="icon-plus icon-large"></i></a>
                                    
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