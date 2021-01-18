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
    <?php
      require_once('connection.php');
      $recipeid = $_GET['recipe'];
      $result = $conn->prepare("SELECT * FROM Recipes WHERE recipe_id='$recipeid'");
      $result->execute();
      for($i=0; $row = $result->fetch(); $i++){
    ?>
<?php
    $bgimage = $row['image_path'];
      if (!empty($bgimage)) {
?>
        <header style="background-image: url(<?php echo $bgimage; ?>)">
<?php
      } else {
?>
        <header style='background-image: url("assets/dist/images/painted-banner.jpg")'>
<?php
      }
?>
    <a href="/" class="logo"><img src="assets/dist/images/logo.svg" alt="" /></a>
    <h1><?php echo $row['recipe_name']; ?></h1>
  </header>

  <main class="recipe-details-page">
    <div class="quick-info">
      <label>Author: <?php echo $row['author']; ?></label>
      <label><a href="#"></a><?php echo $row['recipe_name']; ?></a></label>
      <div class="break"></div>
      <label>Cook Time: <?php echo $row['cook_time']; ?></label>
      <label>Prep Time: <?php echo $row['prep_time']; ?></label>
      <label>Servings: <?php echo $row['servings']; ?></label>
      <label>Preheat Oven: <?php echo $row['oven_temp']; ?>&deg;</label>
    </div>

    <div class="instructions">
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
      <ol>
        <?php
            // Decode JSON data to PHP associative array
            $ingredients = json_decode($row['instructions']);

            foreach ($ingredients as $key => $jsons) { // This will search in the 2 jsons
              foreach($jsons as $key => $value) {
                  echo '<li>' . $value . '</li>';
                }
            }
          ?>
      </ol>
    </div>
    <div class="return-to-listing">
      <a href="/">Return to Recipe Listing Page</a>
    </div>
		<?php } ?>
  </main>

  <footer>
    &copy; 2020 Collins' Family Cookbook
    <br />
    <a href="https://www.freepik.com/vectors/food">Food vector created by dgim-studio - www.freepik.com</a>
  </footer>

  <script src="assets/dist/js/main.js"></script>

</body>

</html>