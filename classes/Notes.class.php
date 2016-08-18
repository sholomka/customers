<?php
class Notes  {
    /**
     * Имя таблицы
     *
     * @var string
     */
    private $table_name = 'notes';

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
     * Конструктор
     *
     * Meeting constructor.
     * 
     * @param $params
     * 
     */
    public function __construct($method, $params)
    {
        if (!empty($params)) {
            foreach($params as $k => $param) {
                $this->$k = $param;
            }
        }

        $this->result = $this->{$method}($params);
    }

    

    /**
     * Реализация метода получения списка заметок
     *
     * @return string
     */
    public function getAllNotes() {
        $query = "SELECT id, title FROM {$this->table_name}";

        $res = Database::query($query);
        $result = [];
        if ($res && Database::numRows($res) > 0) {
            $result = Database::fetchAll($res);
        }

        return json_encode($result, JSON_UNESCAPED_UNICODE);
    }


    /**
     * Реализация метода создания заметок
     *
     * @param Room $room
     * @param array $params
     * @return bool
     */
    public function add($params=[]) {
        $query = "DELETE FROM notes";
        $res = Database::query($query);

        foreach ($params as $param) {
            $query = "INSERT INTO notes
                      SET title = '{$param['title']}'";

            $res = Database::query($query);

            if (!$res) {
                return json_encode(['response' => 'Ошибка сохранения данных'], JSON_UNESCAPED_UNICODE);
            }
        }

        return json_encode(['response' => 'Данные успешно сохранены'], JSON_UNESCAPED_UNICODE);
    }
}