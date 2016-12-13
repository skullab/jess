<?php
$method = $_SERVER['REQUEST_METHOD'] ;
$params = [] ;
$response = [] ;
switch($method){
	case 'DELETE':
	case 'PUT' :
	parse_str(file_get_contents('php://input'), $params);
	break;
	case 'GET':
	$params = $_GET ;
	break;
	case 'POST':
	$params = $_POST ;
	$response = $params ;
	$response['id'] = 1 ;
	break;
	
}
$params['method'] = $method ;

//sleep(1);
echo json_encode($response);
?>