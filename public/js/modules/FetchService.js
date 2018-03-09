import config from './config.js';


export default class FetchService {
    /**
     *
     * @param {String} path
     * @returns {Promise<Response>}
     */
    static get(path) {
        return this.request('GET', path, undefined);
    }

    /**
     *
     * @param {String} path
     * @param {Object} body
     * @returns {Promise<Response>}
     */
    static post(path, body) {
        return this.request('POST', path, body);
    }

    /**
     *
     * @param {String} path
     * @param {Object} body
     * @returns {Promise<Response>}
     */
    static put(path, body) {
        return this.request('PUT', path, body);
    }

    /**
     *
     * @param {String} path
     * @returns {Promise<Response>}
     */
    static delete(path) {
        return this.request('DELETE', path, undefined);
    }

    /**
     *
     * @param {String} requestMethod
     * @param {String} path
     * @param {Object} body
     * @returns {Promise<Response>}
     */
    static request(requestMethod, path, body) {
        const headers = new Headers();

        if (requestMethod === 'POST' || requestMethod === 'PUT') {
            headers.append('Content-Type', 'application/json; charset=UTF-8');
        }

        const req = new Request(`${config.serverUrl}${path}`, {
            method: requestMethod,
            body: body,
            headers: headers,
            credentials: 'include',
            mode: 'cors'
        });

        return fetch(req);
    }
}