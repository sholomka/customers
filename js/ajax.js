class Ajax {
    constructor() {
    }

    /**
     * Реализация ajax-запроса через объект Promise ES6
     *
     * @param params - параметра Request-запроса
     * @param beforeSend - делать ли что-то перед отправкой
     * @param contentType - тип данных Request-запроса
     * @returns {Promise} - возвращаемый объект Promise
     */
    static send(params, beforeSend=false, contentType='json') {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest(),
                body = ``,
                url = '/ajax.php';

            request.open('POST', url);

            switch(contentType) {
                case 'x-www-form-urlencoded':
                    let i = 0;

                    for (let param in params) {
                        body += `${i>0 ? `&${param}` : param}=${encodeURIComponent(params[param])}`;
                        i++;
                    }

                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
                    break;
                default:
                    body = JSON.stringify(params);
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            }

            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            request.addEventListener('load', function() {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject('Server Error: ' + request.status);
                }
            }, false);

            request.addEventListener('error', function() {
                reject("Can't Make AJAX Request");
            }, false);

            if (beforeSend) {
                $('.form-box, .form-box .filter-guide.active, .guide-marks').addClass('disable');
            }

            request.send(body);
        });
    }
}

export default Ajax;