import Model from './model.js';

const model = new Model();

class View {
 
    /**
     * отображает в DOM'e текущее состояние приложения, навешивает необходимые обработчики на интерфейс
     */
    init(controller) {
        this.controller = controller;
        
        let button = document.querySelector('.input button[type=submit]'),
            notes =  this.controller.getNotes();

        button.addEventListener('click', () =>  this.controller.addNewNote());

        notes
            .then(response => this.render(response))
            .catch(error => console.error(error));
        
    }

    /**
     * Создание HTML заметки
     *
     * @param value
     */
    createHTML(value) {
        let notes = document.querySelector('.notes'),
            div = document.createElement('div'),
            close = document.createElement('div');

        div.innerHTML = value;
        div.className = 'note';

        div.appendChild(close);
        close.className = 'close';

        close.addEventListener('click', (e) =>  this.controller.delNote(e), false);
        notes.appendChild(div);
    }

    /**
     * отображает в DOM'e текущее состояние приложения
     */
    render(response) {
        for (let i in response) {
            if (response.hasOwnProperty(i)) {
                this.createHTML(response[i].name)
            }
        }
    }

    /**
     * Добавление заметки
     */
    add() {
        let input = document.querySelector('.input input[type=text]');
        this.createHTML(input.value);

        let note = document.querySelectorAll('.notes .note'),
            noteValue = [];

        for (let i = 0, count = note.length; i < count; i += 1) {
            noteValue.push({name: note[i].textContent});
        }

        model.add(noteValue);
    }

    /**
     * Удаление заметки
     */
    del(elem) {
        let parent = document.querySelector('.notes');
        parent.removeChild(elem);

        let note = document.querySelectorAll('.notes .note'),
            noteValue = [];

        for (let i = 0, count = note.length; i < count; i += 1) {
            noteValue.push({name: note[i].textContent});
        }

        model.add(noteValue);
    }
}

export default View;