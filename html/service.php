<?php
$post = $_POST ;
$get = $_GET ;
$data = array_merge($post,$get);
echo json_encode($data);
?>