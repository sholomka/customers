class View {
    /**
     * отображает в DOM'e текущее состояние приложения, навешивает необходимые обработчики на интерфейс
     */
    init(controller) {
        this.controller = controller;
        
        let buttonSave =  document.querySelector('#save'),
            buttonAdd =  document.querySelector('#add'),
            buttonEdit =  document.querySelector('#edit'),
            buttonDelete =  document.querySelector('#delete');

            // notes =  this.controller.getNotes();

        buttonSave.addEventListener('click', () => this.save());
        buttonAdd.addEventListener('click', () => this.add());

        if (buttonEdit) {
            buttonEdit.addEventListener('click', (e) => this.edit(e));
        }

        if (buttonDelete) {
            buttonDelete.addEventListener('click', () => this.delete());
        }


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
    save() {
        let values = document.querySelectorAll('#basicModal input[type="text"], #basicModal input[type="email"]'),
            customer = {},
            error = false,
            errorClass = document.querySelector('.has-error'),
            id = $('#basicModal').data().id;

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

        if (id) {
            customer['id'] = id;
        }

        if (error) {
            return false;
        } else {
            this.controller.save(customer);
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


    add() {



        $('#basicModal').data('id', '').modal('show');



    }

    /**
     * Редактирование клиента
     */
    edit(e) {
        let tr = $(e.currentTarget).closest('tr'),
            id = tr.find('.id').text(),
            name = tr.find('.name').text(),
            email = tr.find('.email').text(),
            telephone = tr.find('.telephone').text(),
            address = tr.find('.address').text(),
            street = tr.find('.street').text(),
            city = tr.find('.city').text(),
            state = tr.find('.state').text(),
            zip = tr.find('.zip').text();

        $('#name').val(name);
        $('#email').val(email);
        $('#telephone').val(telephone);
        $('#address').val(address);
        $('#street').val(street);
        $('#city').val(city);
        $('#state').val(state);
        $('#zip').val(zip);

       $('#basicModal').attr('data-id', id).modal('show');
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