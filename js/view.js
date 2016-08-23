class View {
    /**
     * Диалоговое окно сохранения/редактирования
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get BASICMODAL() {
        return $('#basicModal');
    }

    /**
     * Диалоговое окно удаления
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get DELETEMODAL() {
        return $('#deleteModal');
    }

    /**
     * Имя клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get NAME() {
        return $('#name');
    }

    /**
     * Email клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get EMAIL() {
        return $('#email');
    }

    /**
     * Телефон клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get TELEPHONE() {
        return $('#telephone');
    }

    /**
     * Адрес клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get ADDRESS() {
        return $('#address');
    }

    /**
     * Улица клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get STREET() {
        return $('#street');
    }

    /**
     * Город клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get CITY() {
        return $('#city');
    }

    /**
     * Страна клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get STATE() {
        return $('#state');
    }

    /**
     * Zip клиента
     *
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     */
    static get ZIP() {
        return $('#zip');
    }

    /**
     * Навешивает необходимые обработчики на интерфейс
     */
    init(controller) {
        this.controller = controller;
        
        let buttonSave =  $('#save'),
            buttonAdd = $('#add'),
            buttonTable =  $('.table'),
            buttonDeleteSuccess =  $('#del');

        buttonSave.click( () => this.save() );
        buttonAdd.click( () => this.add() );
        buttonDeleteSuccess.click( () => this.del() );

        buttonTable.on('click', '.edit', (e) => {
            this.edit(e)
        });

        buttonTable.on('click', '.delete', (e) => {
            this.showDelWindow(e)
        });
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

        $(tr).attr('data-id', response.id);

        for (let i in response) {
            if (response.hasOwnProperty(i)) {
                let typeTd = i == 'id' ? 'th' : 'td';
                td = this.createHTML(typeTd, response[i]);
                td.className = i;
                tr.appendChild(td);
            }
        }

        td = this.createHTML('td', `<td>
                                        <a href="#"><span class="glyphicon glyphicon-pencil edit"></span></a>
                                        <a href="#"> <span class="glyphicon glyphicon-remove delete"></span></a>
                                    </td>`);

        tr.appendChild(td);
        table.appendChild(tr);
    }

    /**
     * Сохранения клиента
     */
    save() {
        let values = document.querySelectorAll('#basicModal input[type="text"], #basicModal input[type="email"]'),
            customer = {},
            error = false,
            errorClass = document.querySelector('.has-error'),
            id = View.BASICMODAL.attr('data-id');

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
            let tr = $(`tr[data-id="${id}"]`);

            tr.find('.id').text(id);
            tr.find('.name').text(View.NAME.val());
            tr.find('.email').text(View.EMAIL.val());
            tr.find('.telephone').text(View.TELEPHONE.val());
            tr.find('.address').text(View.ADDRESS.val());
            tr.find('.street').text(View.STREET.val());
            tr.find('.city').text(View.CITY.val());
            tr.find('.state').text(View.STATE.val());
            tr.find('.zip').text(View.ZIP.val());

            View.BASICMODAL.modal('hide');
        }
    }

    /**
     * Добавление клиента
     */
    add() {
        View.BASICMODAL.data('id', '')
            .find('.has-error').removeClass('has-error').end()
            .find('input[type="text"], input[type="email"]').val('').end()
            .modal('show');
    }

    /**
     * Редактирование клиента
     */
    edit(e) {
        let tr = $(e.currentTarget).closest('tr');
        View.BASICMODAL.find('.has-error').removeClass('has-error');
        View.NAME.val(tr.find('.name').text());
        View.EMAIL.val(tr.find('.email').text());
        View.TELEPHONE.val(tr.find('.telephone').text());
        View.ADDRESS.val(tr.find('.address').text());
        View.STREET.val(tr.find('.street').text());
        View.CITY.val( tr.find('.city').text());
        View.STATE.val(tr.find('.state').text());
        View.ZIP.val(tr.find('.zip').text());
        View.BASICMODAL.attr('data-id', tr.find('.id').text());
        View.BASICMODAL.modal('show');
    }

    /**
     * Окно удаления клиента
     */
    showDelWindow(e) {
        let tr = $(e.currentTarget).closest('tr');
        View.DELETEMODAL.attr('data-id', tr.data().id);
        View.DELETEMODAL.modal('show');
    }

    /**
     * Удаление клиента
     */
    del() {
        let id = View.DELETEMODAL.attr('data-id'),
            tr = $(`tr[data-id="${id}"]`);
        this.controller.del(id);
        tr.remove();
        View.DELETEMODAL.modal('hide');
    }
}

export default View;