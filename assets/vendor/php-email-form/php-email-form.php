<?php
/**
 * PHP Email Form - Version 1.0
 * Simple PHP Email Form
 * https://bootstrapmade.com/php-email-form/
 */

class PHP_Email_Form
{
    public $to;
    public $from_name;
    public $from_email;
    public $subject;
    public $message;
    public $ajax;
    public $smtp;

    public function __construct()
    {
        $this->ajax = false;
        $this->smtp = array();
    }

    public function add_message($value, $label = '', $max_length = 0)
    {
        if ($max_length > 0 && strlen($value) > $max_length) {
            $value = substr($value, 0, $max_length);
        }
        
        if (!empty($label)) {
            $this->message .= $label . ": " . $value . "\n";
        } else {
            $this->message .= $value . "\n";
        }
    }

    public function send()
    {
        $headers = "From: " . $this->from_name . " <" . $this->from_email . ">\r\n";
        $headers .= "Reply-To: " . $this->from_email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

        $mail_sent = mail($this->to, $this->subject, $this->message, $headers);

        if ($mail_sent) {
            return "OK";
        } else {
            return "Error: Unable to send email";
        }
    }
}
?>

