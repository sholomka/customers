import Ajax from './ajax.js';

class Model {
    /**
     * Инициализация контроллера
     *
     * @param controller
     */
    init(controller) {
        this.controller = controller;
    }

    /**
     * Добавить/редактировать нового клиента
     *
     * @param value
     */
    save(value) {
        this.params = {data: value};

        Ajax.send('save', this.params)
            .then(response => {
                if (response.status == 'success') {
                    let data = JSON.parse(response.data);
                    this.controller.render(data);
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * возвращает массив клиентов
     */
    getAll() {
        return Ajax.send('getAll');
    }
}

export default Model;