<!DOCTYPE html>
<html>
<head>
	<title></title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	  <link rel="stylesheet" href="cart.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	  <link href="https://fonts.googleapis.com/css?family=Abril+Fatface|Dancing+Script" rel="stylesheet">
</head>
<body class="container">
	<h1 class="text-center text-danger mb-5" 
	style="font-family: 'Abril Fatface', cursive;"> ANIMECORNER MERCHANDISE CART</h1>

	<div class="row">

	<?PHP

	$con = mysqli_connect('localhost','root',"","ytshoppingcart");
	// mysqli_select_db($con,'ytshoppingcart');

	// if($con){
	// 	echo "connection succussful";
	// }else{
	// 	echo "no connection";
	// }


	$query = " SELECT `name`, `image`, `price`, `discount` FROM `ytshoppingcart` order by id ASC ";

	$queryfire = mysqli_query($con, $query);

	$num = mysqli_num_rows($queryfire);

	if($num > 0){
		while($product = mysqli_fetch_array($queryfire)){
			?>
			
		<div class="col-lg-3 col-md-3 col-sm-12">
			
			<form>
				<div class="card" style="background-color: grey;">
					<h6 class="card-title bg-info text-white p-2 text-uppercase"> <?php echo
					 $product['name'];  ?>   </h6>

					<div class="card-body">
						 <img src="<?php echo
						 $product['image'];
					  ?>" alt="phone" class="img-fluid mb-2" >

					 <h6> &#8377; <?php echo $product['price'];  ?><span> (<?php echo $product['discount'];  ?>% off) </span> </h6> 

					 <h6 class="badge badge-success"> 4.4 <i class="fa fa-star"> </i> </h6>

					 <input type="text" name="" class="form-control" placeholder="Quantity">

					</div>
					<div class="btn-group d-flex">
						<button class="btn btn-success flex-fill"> Add to cart </button> <button class="btn btn-warning flex-fill text-white"> Buy Now </button>
					</div>
				</div>
			</form>
		</div>
	<?php		
		}
	}
	?>
</div>
</body>
</html>