<?php
header("Content-Type:text/html; charset=utf-8");
$movie_name = $_REQUEST["movie_name"];
$words = array("我", "妳", "你", "他", "她", "它", "牠");
$result = $movie_name;

foreach($words as $word){
  $pos = strpos($movie_name, $word);
  if($pos !== false){
    # a character of traditional chinese is 3 bytes ,so is +3
    $result = substr($movie_name, 0, $pos+3) . "阿嬤" . substr($movie_name, $pos+3);
    break;
  }
}

echo $result;

?>
