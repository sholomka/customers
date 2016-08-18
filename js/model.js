import Ajax from './ajax.js';

class Model {
    /**
     * сохранить новую заметку
     */
    add(value) {
        this.params = {method: 'add', data: value};
        
        Ajax.send(this.params)
            .then(response => console.log(response))
            .catch(error => console.error(error));
    }

    /**
     * возвращает массив заметок
     */
    getAllNotes() {
        this.params = {method: 'getAllNotes'};
        return Ajax.send(this.params);
    }

}


export default Model;