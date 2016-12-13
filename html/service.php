<?php
$method = $_SERVER['REQUEST_METHOD'] ;
$params = [] ;
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
	break;
	
}
$params['method'] = $method ;
//sleep(1);
echo json_encode($params);
?>