<?php
spl_autoload_register(function ($class) {
    $classFileName = __DIR__ . '/classes/' . $class . '.class.php';
    $dbFileName = __DIR__ . '/config/' . $class . '.class.php';

    if (file_exists($dbFileName)) {
        include $dbFileName;
    }

    if (file_exists($classFileName)) {
        include $classFileName;
    }
});

new Customers();

