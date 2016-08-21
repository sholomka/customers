class View {




    /**
     * отображает в DOM'e текущее состояние приложения, навешивает необходимые обработчики на интерфейс
     */
    init(controller) {
        this.controller = controller;
        
        let buttonAdd =  document.querySelector('#save'),
            buttonEdit =  document.querySelector('#edit'),
            buttonDelete =  document.querySelector('#delete');

            // notes =  this.controller.getNotes();

        buttonAdd.addEventListener('click', () => this.add());
        buttonEdit.addEventListener('click', (e) => this.edit(e));
        buttonDelete.addEventListener('click', () => this.delete());

        // notes
        //     .then(response => this.render(response))
        //     .catch(error => console.error(error));
        
    }

    /**
     * Создание HTML
     *
     * @param html
     * @param inner
     */
    createHTML(html, inner) {
        let node = document.createElement(html);
        node.innerHTML = inner;
        return node;
    }

    /**
     * отображает в DOM'e текущее состояние приложения
     */
    render(response) {
        let table = document.querySelector('.table tbody'),
            tr = document.createElement('tr'),
            td = {};

        for (let i in response) {
            if (response.hasOwnProperty(i)) {
                let typeTd = i == 'id' ? 'th' : 'td';
                td = this.createHTML(typeTd, response[i]);
                tr.appendChild(td);
            }
        }

        td = this.createHTML('td', `
                        <td>
                            <span class="glyphicon glyphicon-pencil"></span>
                            <span class="glyphicon glyphicon-remove"></span>
                        </td>`);

        tr.appendChild(td);
        table.appendChild(tr);
    }

    /**
     * Добавление клиента
     */
    add(id=null) {
        let values = document.querySelectorAll('#basicModal input[type="text"], #basicModal input[type="email"]'),
            customer = {},
            error = false,
            errorClass = document.querySelector('.has-error');

        if (errorClass) {
            errorClass.classList.remove('has-error');
        }

        for (let i = 0, count = values.length; i < count; i += 1) {
            if (values[i].value == '') {
                error = true;
                document.querySelector('#'+ values[i].id).parentNode.classList.add('has-error');
            }

            customer[values[i].id] = values[i].value;
        }

        if (error) {
            return false;
        } else {
            if (id) {
                this.controller.edit(customer, id);
            } else {
                this.controller.add(customer);
            }

            $('#basicModal').modal('hide');
        }

        // noteValue.push({name: name.value});
        // let input = document.querySelector('.input input[type=text]');
        // this.createHTML(input.value);
        //
        // let note = document.querySelectorAll('.notes .note'),
        //     noteValue = [];
        //
        // for (let i = 0, count = note.length; i < count; i += 1) {
        //     noteValue.push({name: note[i].textContent});
        // }
        //
        // model.add(noteValue);
    }

    /**
     * Редактирование клиента
     */
    edit(e) {
        let id = e.currentTarget.parentNode.parentNode.getAttribute('data-id');

        this.add(id);

        // $('#basicModal').modal('show');

    }

    /**
     * Удаление клиента
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