<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');
    
    
    
    include 'QueryBuilder.php';
    // die( json_encode(array("1"=>"one")) );

    function res($mixedType) {
        die( json_encode($mixedType ) );
    }


    define('LOCALHOST', 'localhost');
    define('DBNAME', 'shopApp');
    define('USER', 'root');
    define('PASSWORD', '');
    
    // die( json_encode(array("error" => "error")) );
    $connection = NULL;

    try{
        $connection = new PDO('mysql:host=localhost;dbname=' . DBNAME, USER, PASSWORD);
        // $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    } catch( PDOException $ex ){
        die( json_encode(
            array(
                'result'=>false,
                'exception'=>$ex->getMessage()
                )
            ) 
        );
    }

    // $request = $_POST;
    $request = json_decode( file_get_contents("php://input") );
    $request = json_decode( json_encode($request), true );


    $output = array();
    $queryType = "";
    $tableName = "";

    // First Check if Request Type is Valid
    $allowedQueryTypes = array("select", "update", "insert", "delete");
    if( isset($request["queryType"] ) ){
        if (in_array($request["queryType"], $allowedQueryTypes, false) ){
            $queryType = $request["queryType"];
        }
    } else {
        $output["error"] = "Invalid Request Type";
        // $output["request"] = $request["queryType"];
        res($output);
    }


    // Check if Table Name exist and is valid
    $allowedTables = array('posts', 'categories', 'pages');
    if( isset($request["tableName"]) ) {
        if ( in_array($request["tableName"], $allowedTables ) ) {
            echo("Table in Array");
            $tableName = $request["tableName"];
        } else {
            http_response_code(400);
            $output["error"] = "Access to " . $request["tableName"] . " not allowed";
            die( json_encode($output));
        }
    } else {
        http_response_code(400);
        $output["error"] = "Table Name not Provided";
        die( json_encode($output));
    }

    // Now If both Request Type and Table Name are correct create QueryBuilder Object
    $qb = new QueryBuilder($connection, $request["tableName"]);
    
    // Check if Params Exist
    $params = isset($request["params"]) ? $request["params"] : NULL;

    // Build Query
    $qb->{$queryType}($params);

    // Execute Query
    $qb->execute($params);

    // Return Output
    die( json_encode(  $qb->get_output() ) );

?>