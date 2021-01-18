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
  <link rel="stylesheet" type="text/css" href="assets/dist/css/homepage.css" />

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

  <main class="recipes">
    <?php
      require_once('connection.php');
      $result = $conn->prepare("SELECT * FROM Recipes ORDER BY recipe_id ASC");
      $result->execute();
      for($i=0; $row = $result->fetch(); $i++){
    ?>

    <a href="recipe-details.php?recipe=<?php echo $row['recipe_id']; ?>" class="recipe">
      <div class="food-picture">
        <img src="<?php echo $row['image_path']; ?>" onError="this.src='assets/dist/images/example-food.jpg';" alt="" />
      </div>
      <div class="recipe-details">
        <h2><?php echo $row['recipe_name']; ?></h2>
        <div class="cook-time"><?php echo $row['cook_time']; ?></div>
        <ul class="ingredients">
          <?php
            // Decode JSON data to PHP associative array
            $ingredients = json_decode($row['ingredients']);

            foreach ($ingredients as $key => $jsons) { // This will search in the 2 jsons
              foreach($jsons as $key => $value) {
                  echo '<li>' . $value . '</li>';
                }
            }
          ?>
        </ul>
      </div>
    </a>
		<?php } ?>
  </main>

  <footer>
    Collins' Family Cookbook
  </footer>

  <script src="assets/dist/js/main.js"></script>

</body>

</html>