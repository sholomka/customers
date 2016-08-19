class Ajax {

    /**
     * Реализация ajax-запроса через объект Promise ES6
     *
     * @param params
     * @param url
     * @param contentType
     * @returns {Promise}
     */
    static send(url, params = {}, contentType = 'json') {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest(),
                body = ``;

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

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject('Server Error: ' + request.status);
                }
            }, false);

            request.addEventListener('error', () => {
                reject("Can't Make AJAX Request");
            }, false);

            request.send(body);
        });
    }
}

export default Ajax;