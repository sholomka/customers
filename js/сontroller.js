import View from './view.js';
import Model from './model.js';

const view = new View();
const model = new Model();

class Controller {
    /**
     * инициирует сохранение клиента моделью и инициирует отображение изменений представлением
     */
    save(customer) {
        model.save(customer);
    }

    /**
     * Удаление клиента
     *
     * @param id
     */
    del(id) {
        model.del(id);
    }

    /**
     * отображает в DOM'e текущее состояние приложения
     *
     * @param response
     * @returns {*}
     */
    render(response) {
        return view.render(response);
    }

    /**
     * инициализирует модель и представление. Этот метод должен являться точкой входа в приложение
     */
    init() {
        view.init(this);
        model.init(this);
    }
}

export default Controller;