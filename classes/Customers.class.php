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

      /*  if (!empty($params)) {
            foreach($params as $k => $param) {
                $this->$k = $param;
            }
        }*/

       /* if (!empty($method)) {
            $this->result = $this->{$method}($params);
        }*/
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

        return $result;
//        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }


    public function getOne($id) {
        $sql = "SELECT id, name, email, telephone, address, street, city, state, zip  
                FROM {$this->table_name}
                WHERE id = $id";
        $result = Database::getData($sql, 'one');

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }

    /**
     *
     * Реализация метода создания customers
     * @return string
     */
    public function save() {
        $params = $this->getParam('data');

        if ($params['id']) {
            $sql= "UPDATE customers 
                   SET name = '{$params['name']}',
                      email = '{$params['email']}',
                      telephone = '{$params['telephone']}',
                      address = '{$params['address']}',
                      street = '{$params['street']}',
                      city = '{$params['city']}',
                      state = '{$params['state']}',
                      zip = '{$params['zip']}'
                   WHERE id =  {$params['id']}
                   ";
        } else {
            $sql= "INSERT INTO customers 
                  SET name = '{$params['name']}',
                      email = '{$params['email']}',
                      telephone = '{$params['telephone']}',
                      address = '{$params['address']}',
                      street = '{$params['street']}',
                      city = '{$params['city']}',
                      state = '{$params['state']}',
                      zip = '{$params['zip']}'
                   ";
        }

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

    /**
     * Реализация метода редактирования клиентов
     */
    public function edit()
    {
        $params = $this->getParam('data');
        $id= $this->getParam('id');
        $sql= "UPDATE customers 
                  SET name = '{$params['name']}',
                      email = '{$params['email']}',
                      telephone = '{$params['telephone']}',
                      address = '{$params['address']}',
                      street = '{$params['street']}',
                      city = '{$params['city']}',
                      state = '{$params['state']}',
                      zip = '{$params['zip']}'
                  WHERE id = {$id}    
                   ";
        $res = Database::query($sql);
    }

    public function getParam($paramName)
    {
        $params = json_decode(trim(file_get_contents('php://input')), true);
        return isset($params[$paramName]) ? $params[$paramName] : null;
    }
}