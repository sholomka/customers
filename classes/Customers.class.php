<?php
class Customers  {
    /**
     * Имя таблицы
     *
     * @var string
     */
    private $table_name = 'customers';

    /**
     * ID заметки
     *
     * @var
     */
    private $id;

    /**
     * Название заметки
     *
     * @var
     */
    private $title;

    
    /**
     * Возвращаемые данные
     *
     * @var
     */
    public $result;

    /**
     * Конфиг на production
     * @var
     */
    public $config;

    /**
     * Локальный конфиг
     * @var
     */
    public $_config;

    /**
     * Конструктор
     *
     * Meeting constructor.
     * 
     * @param $params
     * 
     */
    public function __construct($method='', $params=[])
    {
        $this->connectDB();
        $this->parseUrl();
        $customers = $this->getAll();

        if (!empty($this->page)) {
            echo $this->{$this->page}($params);
        } else {
            echo $this->renderHTML('templates/index.html', compact('customers'));
        }
    }

    /**
     * Установка конфига
     */
    public function setConfig()
    {
        $configPath = realpath(implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'config', 'config.php']));
        $_configPath = realpath(implode(DIRECTORY_SEPARATOR, [__DIR__, '..', 'config', '_config.php']));
        $this->config = require_once($configPath);

        if (file_exists($_configPath)) {
            $this->_config = require_once($_configPath);
            $this->config  = array_replace_recursive ($this->config , $this->_config);
        }
    }

    /**
     * Коннект к БД
     */
    public function connectDB()
    {
        $this->setConfig();
        Database::getInstance($this->config);
    }

    /**
     * Рендер HTML
     *
     * @param $html
     * @param array $vars
     * @return string
     */
    public function renderHTML($html, $vars = [])
    {
        extract($vars);
        ob_start();
        include_once($html);
        return ob_get_clean();
    }

    /**
     * Парсинг УРЛ
     */
    public function parseUrl()
    {
        $request = trim($_SERVER['REQUEST_URI'], '/');
        $part = explode('?', $request);
        $path = explode('/', $part[0]);

        // страница
        if (!empty($path)) {
            $this->page = array_shift($path);
        }
    }

    /**
     * Реализация метода получения списка клиентов
     *
     * @return string
     */
    public function getAll() {
        $sql = "SELECT id, name, email, telephone, address, street, city, state, zip  FROM {$this->table_name}";
        $result = Database::getData($sql);

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Реализация метода получения одного клиента
     *
     * @param $id
     * @return string
     */
    public function getOne($id) {
        $sql = "SELECT id, name, email, telephone, address, street, city, state, zip  
                FROM {$this->table_name}
                WHERE id = $id";
        $result = Database::getData($sql, 'one');

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    /**
     *
     * Реализация метода создания клиентов
     * @return string
     */
    public function save() {
        $name =  $this->getParam('name');
        $email =  $this->getParam('email');
        $telephone = $this->getParam('telephone');
        $address =  $this->getParam('address');
        $street =  $this->getParam('street');
        $state =  $this->getParam('state');
        $city =  $this->getParam('city');
        $zip =  $this->getParam('zip');
        $id =  $this->getParam('id');

        if ($id) {
            $sql= "UPDATE customers 
                   SET name = '{$name}',
                       email = '{$email}',
                       telephone = '{$telephone}',
                       address = '{$address}',
                       street = '{$street}',
                       city = '{$city}',
                       state = '{$state}',
                       zip = '{$zip}'
                   WHERE id =  {$id}
                   ";

            $res = Database::query($sql);

            if (!$res) {
                return json_encode(['response' => 'Ошибка сохранения данных', 'status' => 'false'], JSON_UNESCAPED_UNICODE);
            }

            return json_encode(['response' => 'Данные успешно сохранены', 'status' => 'success'], JSON_UNESCAPED_UNICODE);

        } else {
            $sql= "INSERT INTO customers 
                   SET name = '{$name}',
                       email = '{$email}',
                       telephone = '{$telephone}',
                       address = '{$address}',
                       street = '{$street}',
                       city = '{$city}',
                       state = '{$state}',
                       zip = '{$zip}'
                   ";

            $res = Database::query($sql);

            $lastID = Database::lastInsertId($res);
            $data= [];

            if ($lastID) {
                $data = $this->getOne($lastID);
            }

            if (!$res) {
                return json_encode(['response' => 'Ошибка сохранения данных', 'status' => 'false'], JSON_UNESCAPED_UNICODE);
            }

            return json_encode(['response' => 'Данные успешно сохранены', 'status' => 'success', 'data' => $data], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Удаление клиентов
     *
     * @return string
     */
    public function delete()
    {
        $id =  $this->getParam('id');
        $sql = "DELETE FROM customers WHERE id = {$id}";
        $res = Database::query($sql);

        if ($res) {
            return json_encode(['response' => 'Данные успешно удалены', 'status' => 'success'], JSON_UNESCAPED_UNICODE);
        }
    }

    /**
     * Получение параметров
     *
     * @param $paramName
     * @return null
     */
    public function getParam($paramName)
    {
        $params = json_decode(trim(file_get_contents('php://input')), true);
        return isset($params[$paramName]) ? $params[$paramName] : null;
    }
}