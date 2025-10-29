<?php
header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate input
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If there are errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Validation failed', 'errors' => $errors]);
    exit;
}

// Your email address where you want to receive messages
$to = 'lukiclazar.dev@gmail.com';

// Email subject
$emailSubject = "Portfolio Contact Form: $subject";

// Build email body
$emailBody = "You have received a new message from your portfolio contact form.\n\n";
$emailBody .= "Name: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Subject: $subject\n\n";
$emailBody .= "Message:\n$message\n";
$emailBody .= "\n---\n";
$emailBody .= "Sent from: " . $_SERVER['HTTP_HOST'];

// Email headers
$headers = "From: Portfolio Contact Form <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mailSent = mail($to, $emailSubject, $emailBody, $headers);

// Alternative: Send a copy to the user
$userSubject = "Thank you for contacting Lazar Lukić";
$userBody = "Hello $name,\n\n";
$userBody .= "Thank you for reaching out! I have received your message and will get back to you as soon as possible.\n\n";
$userBody .= "Your message:\n$message\n\n";
$userBody .= "Best regards,\nLazar Lukić";

$userHeaders = "From: Lazar Lukić <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
$userHeaders .= "Reply-To: lukiclazar.dev@gmail.com\r\n";

// Send confirmation email to user
mail($email, $userSubject, $userBody, $userHeaders);

if ($mailSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to send message. Please try again later.'
    ]);
}
?>

