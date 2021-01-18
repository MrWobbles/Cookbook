<?php
$db_server = "127.0.0.2";
$db_username = "collinsc_recipes";
$db_password = "ED6q%Qrj";
$db_database = "collinsc_recipes";

$conn = new PDO("mysql:host=$db_server;dbname=$db_database", $db_username, $db_password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>