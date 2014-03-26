<?
$ipad = 'ipad2';
if($_POST['uuid'] == '4FA37385-FDFA-4BEF-A5AF-67DF5408A410') $ipad = 'ipad1';

$r = file_put_contents('../reportes/' . $ipad . '_' . date('d-m-Y H.i.s') . '.xls', stripslashes($_POST['html']));
if($r === false){
	echo '0';
}else{
	echo '1';
}