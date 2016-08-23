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
                if (response.status == 'success' && response.data) {
                    let data = JSON.parse(response.data);
                    this.controller.render(data);
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * Удаление клиента
     *
     * @param id
     */
    del(id) {
        this.params = {id: id};

        Ajax.send('delete', this.params)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }
}

export default Model;