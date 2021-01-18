<?php
$db_server = "127.0.0.2";
$db_username = "collinsc_recipes";
$db_password = "ED6q%Qrj";
$db_database = "collinsc_recipes";

$conn = new PDO("mysql:host=$db_server;dbname=$db_database", $db_username, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($stmt = $conn->prepare('INSERT INTO Recipes (recipe_name, image_path, category, ingredients, cook_time, prep_time, servings, author, submitted_by, oven_temp, instructions, recipe_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')) {
  $data = array(
    $_POST['recipe-name'],
    $_POST['recipe-image'],
    $_POST['category'],
    $_POST['ingredients'],
    $_POST['cooktime'],
    $_POST['preptime'],
    $_POST['servings'],
    $_POST['author'],
    $_POST['submittedby'],
    $_POST['oventemp'],
    $_POST['instructions'],
    $_POST['recipelink']
);
	$stmt->execute($data);
	echo 'You have successfully registered a new recipe!';
} else {
	echo 'Could not prepare statement!';
}
?>