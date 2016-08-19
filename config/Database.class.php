<?php
class Database {
    private static $instance;
    protected static $pdo;

    private function __construct($config) {
        try {
            $dsn = 'mysql:host='. $config['db']['host'] .';dbname='. $config['db']['dbname'] .';charset='. $config['db']['charset'];
            self::$pdo = new PDO($dsn, $config['db']['username'], $config['db']['password']);
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    private function __clone() {}

    public static function query($sql, $params = []) {
        try {
            $stmt = self::$pdo->prepare($sql);

            if ($stmt->execute($params)) {
                return $stmt;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function getInstance($config) {
        if ( empty( self::$instance ) ) {
            self::$instance = new self($config);
        }
        return self::$instance;
    }

    public static function getData($sql, $fetch_type = 'all', $fetch_style = PDO::FETCH_OBJ) {
        $result = Database::query($sql);
        $data = [];

        if ($result && Database::rowCount($result) > 0) {
            $data = $fetch_type == 'all' ? $result->fetchAll($fetch_style) : $result->fetch($fetch_style);
        }

        return $data;
    }

    public static function lastInsertId($stmt)
    {
        return self::$pdo->lastInsertId();
    }

    public static function rowCount($stmt)
    {
        return is_bool($stmt) ? 0 : $stmt->rowCount();
    }
}
?>