      <div class="navbar navbar-fixed-top nav-wrapper">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="nav-collapse collapse">
                        <!-- .nav, .navbar-search, .navbar-form, etc -->
					<ul class="nav">
					<li><a href="dashboard.php"></i>&nbsp;Home</a></li>
					<li><a href="users.php"></i>&nbsp;Users</a></li>
					<?php 
					include('dropdown.php');
					?>
					<li><a href="books.php">&nbsp;Books</a></li>
					<li><a href="member.php"></i>&nbsp;Member</a></li>
					<li><a href="#myModal" data-toggle="modal"></i>&nbsp;Search</a></li>
					<!-- <li><a href="section.php"><i class="icon-group icon-large"></i>&nbsp;Sections</a></li> -->
				
					<li></li>
					</ul>
					 <div class="pull-right">
						<div class="admin"><a href="#logout" data-toggle="modal"></i>&nbsp;Logout</a></div>
                     </div>
                    </div>
                </div>
            </div>
        </div>
		 <?php include('search_form.php'); ?>

 
