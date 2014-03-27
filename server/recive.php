<?php 
header('Access-Control-Allow-Origin: *');

mkdir(dirname(__FILE__) .  '/reportes/' . $_POST['uuid'] , 0777, true);
$fecha =  date('d-m-Y H.i.s');
$r = file_put_contents(dirname(__FILE__) . '/reportes/' . $_POST['uuid'] . '/' . $_POST['uuid'] . '_' . $fecha . '.xls', stripslashes($_POST['html']));
chmod(dirname(__FILE__) . '/reportes/' . $_POST['uuid'] . '/' . $_POST['uuid'] . '_' . $fecha . '.xls', 0777);
if($r === false){
	echo '0';
}else{
	echo '1';
}


