<?php
    require_once __DIR__ . '/classes/HtmlTool.php';
    $id = HtmlTool::getId();
    $params = array(
        'id' => $id,
        'page' => 'project'
    );
    HtmlTool::render('project.html', $params);
?>
