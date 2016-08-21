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
     * Добавить нового клиента
     *
     * @param value
     */
    add(value, id = null) {
        this.params = {data: value},
            method = id ? 'add' : 'edit';

        Ajax.send(method, this.params)
            .then(response => {
                if (response.status == 'success') {
                    let data = JSON.parse(response.data);
                    this.controller.render(data);
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * Редактирование клиента
     *
     * @param id
     */
    edit(id) {
        this.params = {data: id};

        Ajax.send('edit', this.params)
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