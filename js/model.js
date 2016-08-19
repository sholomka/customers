import Ajax from './ajax.js';

class Model {
    /**
     * сохранить новую заметку
     */
    add(value) {
        this.params = {data: value};
        
        Ajax.send('add', this.params)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    /**
     * возвращает массив заметок
     */
    getAll() {
        return Ajax.send('getAll');
    }
}

export default Model;