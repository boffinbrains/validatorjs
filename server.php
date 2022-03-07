<?php
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    
    // http_response_code(404);
    echo json_encode($data);