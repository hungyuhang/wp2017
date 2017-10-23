<?php
header("Content-Type:text/html; charset=utf-8");
$movie_name = $_REQUEST["movie_name"];
$words = array("我", "妳", "你", "他", "她", "它", "牠");
$result = $movie_name;

#foreach($words as $word){
#  $pos = strpos($movie_name, $word);
#  if($pos !== false){
#    # a character of traditional chinese is 3 bytes ,so is +3
#    $result = substr($movie_name, 0, $pos+3) . "阿嬤" . substr($movie_name, $pos+3);
#    break;
#  }
#}

for($index = mb_strlen($result, "utf-8")-1; $index >= 0; $index--){
  $w = mb_substr($result, $index, 1, "utf-8");
  foreach($words as $word){
    if($w === $word){
      $result = mb_substr($result, 0, $index+1, "utf-8") . 
          "阿嬤" . mb_substr($result, $index+1, null, "utf-8");
      break;
    }
  }
}

echo $result;

?>
