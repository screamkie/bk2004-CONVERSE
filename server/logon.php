<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'test');
  $sql = "INSERT INTO `urser` (`username`,`password`,`nickname`) VALUES ($username,$password,$username)";
  $res = mysqli_query($link, $sql);
  print_r($res)


?>
