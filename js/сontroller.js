import View from './view.js';
import Model from './model.js';

const view = new View();
const model = new Model();

class Controller {
    /**
     * инициирует сохранение заметки моделью и инициирует отображение изменений представлением
     */
    addNewNote() {
        view.add();
        console.log(1);
    }

    /**
     * Удаление заметки
     *
     * @param e
     */
    delNote(e) {
        view.del(e.currentTarget.parentNode);
    }

    /**
     * обращается к модели за всеми заметками
     */
    getNotes() {
        return model.getAllNotes();
    }

    /**
     * инициализирует модель и представление. Этот метод должен являться точкой входа в приложение
     */
    init() {
        view.init(this);
    }
}

export default Controller;