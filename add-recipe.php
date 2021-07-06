<!doctype html>
<!--[if IE 9]><html class="lt-ie10" lang="en" > <![endif]-->
<html class="no-js" lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
  <meta name="apple-mobile-web-app-title" content="Collins' Family Cookbook">
  <title>Collins' Family Cookbook</title>
  <link rel="author" href="humans.txt" />
  <link
    href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&family=Work+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap"
    rel="stylesheet">


  <!-- CSS -->
  <link rel="stylesheet" type="text/css" href="assets/dist/css/main.css" />
  <link rel="stylesheet" type="text/css" href="assets/dist/css/subpage.css" />

  <!-- Fav and touch icons -->
  <!-- <link rel="apple-touch-icon" sizes="144x144" href="assets/dist/images/icons/apple-touch-icon-144-precomposed.png" />
  <link rel="apple-touch-icon" sizes="114x114" href="assets/dist/images/icons/apple-touch-icon-114-precomposed.png" />
  <link rel="apple-touch-icon" sizes="72x72" href="assets/dist/images/icons/apple-touch-icon-72-precomposed.png" />
  <link rel="apple-touch-icon" href="assets/dist/images/icons/apple-touch-icon-57-precomposed.png" />
  <link rel="shortcut icon" href="assets/dist/images/icons/favicon.png" /> -->

  <!--[if lt IE 9]>
		<script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.js"></script>
		<![endif]-->
</head>

<body>

<header>
  <a href="/" class="logo"><img src="assets/dist/images/logo.svg" alt="" /></a>
  <h1>Collins' Family Cookbook</h1>
</header>
<main>

<h2 style="text-align: center;">
  <?php
$db_server = "127.0.0.2";
$db_username = "collinsc_recipes";
$db_password = "ED6q%Qrj";
$db_database = "collinsc_recipes";

$conn = new PDO("mysql:host=$db_server;dbname=$db_database", $db_username, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if ($stmt = $conn->prepare('INSERT INTO Recipes (recipe_name, image_path, category, ingredients, cook_time, prep_time, servings, author, submitted_by, oven_temp, instructions, recipe_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')) {
  

  $ingredientsListing = "[{"; 
  $ingIndex = 0;
  
  
  foreach($_POST['ingredients'] as $ingredientsARR) {
    $ingredientsListing = $ingredientsListing . '"ingredient' . $ingIndex . '": "' . $ingredientsARR . '", ';
    $ingIndex++;
  }

  $ingredientsListing = substr($ingredientsListing, 0, -2);
  $ingredientsListing = $ingredientsListing . "}]";
  
  $instructionsListing = "[{";
  $instIndex = 0;
  
  foreach($_POST['instructions'] as $instructionsARR) {
    $instructionsListing = $instructionsListing . '"ingredient' . $instIndex . '":"' . $instructionsARR . '", ';
    $instIndex++;
  }
  
  $instructionsListing = substr($instructionsListing, 0, -2);
  $instructionsListing = $instructionsListing . "}]";
  
  $data = array(
    $_POST['recipe-name'],
    $_POST['recipe-image'],
    $_POST['category'],
    $ingredientsListing,
    $_POST['cooktime'],
    $_POST['preptime'],
    $_POST['servings'],
    $_POST['author'],
    $_POST['submittedby'],
    $_POST['oventemp'],
    $instructionsListing,
    $_POST['recipelink']
);
	$stmt->execute($data);
	echo 'You have successfully registered a new recipe!';
} else {
	echo 'Recipe could not be saved';
}
?>
</h2>

<a href="/add-recipe.html" class="site-action">Submit Another Recipe</a>
  <a href="/" class="site-action">View All Recipes</a>

</main>

<footer>
  Collins' Family Cookbook
</footer>

<script src="assets/dist/js/main.js"></script>

</body>

</html>