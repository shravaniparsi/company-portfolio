<?php 
$name = $_POST['name'];
$email = $_POST['email'];
$mobile = $_POST['mobile'];
$message = $_POST['message'];
$formcontent="From: $name \n Mobile: $mobile \n Email: $email \n Message: $message";
$recipient = "xxx@xxx.in";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
$retval = mail($recipient, $subject, $formcontent, $mailheader);
?>