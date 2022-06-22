<?php
    require_once( __DIR__ . '/classes/SparqlTool.php' );
    require_once( __DIR__ . '/classes/HtmlTool.php' );
    require_once( __DIR__ . '/classes/HttpTool.php' );
    require_once( __DIR__ . '/classes/Config.php' );

    $id = HtmlTool::getId();
    $dc = HttpTool::getParameter('dc');
    $url = Config::$SPARQLIST_URL . 'dbi_dataset_table_in_a_project';

    $parameters = array(
        'project' => $id
    );

    $result = SparqlTool::postSparqList($url, $parameters);
    
    $count = count($result);

    $response = array(
        'dc' => $dc,
        'data' => $result,
        'count' => $count,
        'total' => $count
    );

    header('content-type: application/json; charset=utf-8');
    echo json_encode($response);
?>
