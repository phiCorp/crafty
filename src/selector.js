/**
 * @name        Selector
 * @version     1.1.1
 * @author      rebelliume <rebelliume@gmail.com>
 * @contact     rebelliume
 * @copyright   rebelliume
 * @license     MIT
 * @released    2024/07/16
 * 
 * @returns {object}
 */

const Selector = function() {
    const $ = {
        $: function (element) {
            const defMethod = element;
            
            const attributes = {
                /**
                 *  @return {object} Style
                 */
                get STYLE() {
                    return element.style;
                },
                /**
                 *  @param {string} Value
                 *  @return {string} Text
                 */
                TEXT: function(value = null) {
                    return value === null ? element.innerText : (element.innerText = value);
                },
                /**
                 *  @param {string} Value
                 *  @return {string} HTML
                 */
                HTML: function(value = null) {
                    return value === null ? element.innerHTML : (element.innerHTML = value);
                },
                /**
                 *  @param {string} Value
                 *  @return {string} Value
                 */
                VAL: function(value = null) {
                    return value === null ? element.value : (element.value = value);
                },
                /**
                 *  @param {string} Property
                 *  @param {string} Value
                 *  @return {object} Attribute
                 */
                ATTR: function (prop, value = null) {
                    return value === null ? element.getAttribute(prop) : (element.setAttribute(prop, value));
                },
                /**
                 *  @param {string} Value
                 *  @return {string} CSSText
                 */
                CSS: function(value = null) {
                    return value === null ? element.cssText : (element.cssText = value);
                },
                /**
                 *  @param {string} Object
                 *  @param {string} Name
                 *  @param {object} Callback
                 */
                ADDEVENT: function (value, callback) {
                    return element.addEventListener(value, callback);
                },
                /**
                 *  @param {string} Object
                 *  @param {string} Name
                 *  @param {object} Callback
                 */
                REMEVENT: function (value, callback) {
                    return element.removeEventListener(value, callback);
                }
            };
    
            Object.keys(attributes).forEach(key => defMethod[key] = attributes[key]);
        
            return defMethod;
        },    
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        ID: function (value) {
            return $$(document.getElementById(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        CLASS: function (value) {
            return $$(document.getElementsByClassName(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        TAG: function (value) {
            return $$(document.getElementsByTagName(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        NAME: function (value) {
            return $$(document.getElementsByName(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        QUERY: function (value) {
            return $$(document.querySelector(value));
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        QUERYALL: function (value) {
            return $$(document.querySelectorAll(value));
        },
        /**
         *  @param {object} Object
         *  @return {object} DOM
         */
        OBJ: function (value) {
            return $$(value);
        },
        /**
         *  @param {string} Value
         *  @return {object} DOM
         */
        CREATE: function (value) {
            return document.createElement(value);
        },
        /**
         *  @param {string} Value
         *  @param {string} Name
         *  @return {object} DOM
         */
        CREATENS: function (value, name) {
            return document.createElementNS(value, name);
        },
        /**
         *  @param {string} Name
         *  @param {string} Value
         *  @param {number} Expire
         *  @return {string} Cookie
         */
        COOKIE: function (name, value = null, expire = null) {
            if(value === null) {
                const data = document.cookie.split(';');
                for (let i = 0; i < data.length; i++) {
                    const cookie = data[i].trim();
                    if (cookie.startsWith(name + '=')) {
                        return cookie.substring(name.length + 1);
                    }
                }
                return '';
            }
            else {
                let date = new Date();
                date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));
                let expires = 'expires=' + date.toUTCString();
                document.cookie = name + '=' + value + ';' + expires + ';path=/';
            }
        },
        /**
         *  @param {string} Name
         *  @param {string} Value
         *  @return {string} Storage
         */
        STORAGE: function (name, value = null) {
            return value === null ? localStorage.getItem(name) : (localStorage.setItem(name, value));
        },
        /**
         *  @param {string} Name
         *  @param {string} Value
         *  @return {string} Storage
         */
        SESTORAGE: function (name, value = null) {
            return value === null ? sessionStorage.getItem(name) : (sessionStorage.setItem(name, value));
        },
        /**
         *  @param {number} Time
         */
        WAIT: async function (value) {
            await new Promise(resolve => setTimeout(resolve, value));
        },
        /**
         *  @param {object} Callback
         *  @param {number} Time
         */
        TIMEOUT: function (callback, value) {
            setTimeout(callback, value);
        },
        /**
         *  @param {object} Callback
         *  @param {number} Time
         */
        INTERVAL: function (callback, value) {
            setInterval(callback, value); 
        },
        /**
         *  @param {object} Callback
         *  @param {number} Time
         */
        CLEARINTERVAL: function (value) {
            clearInterval(value) 
        },
        /**
         *  @param {object} Value
         *  @param {boolean} Option
         *  @return {object} JSON
         */
        JSON: function (value, option) {
            return option == true ? JSON.stringify(value) : JSON.parse(value);
        },
        /**
         *  @param {object} Object
         *  @param {string} Value
         *  @return {boolean} Type
         */
        TYPE: function (value, type = null) {
            if(type === null) {
                return typeof value;
            }
            else {
                switch (type)
                {
                    case 'object':
                        return typeof value == 'object';
                    break;
                    case 'string':
                        return typeof value == 'string';
                    break;
                    case 'number':
                        return typeof value == 'number';
                    break;
                    case 'boolean':
                        return typeof value == 'boolean';
                    break;
                    case 'function':
                        return typeof value == 'function';
                    break;
                    case 'undefined':
                        return typeof value == 'undefined';
                    break;
                    case 'bigint':
                        return typeof value == 'bigint';
                    break;
                    case 'array':
                        return Array.isArray(value);
                    break;
                    case 'null':
                        return value === null;
                    break;
                    case 'empty':
                        return typeof value === 'undefined' || value === null || value === '';
                    break;
                    case 'defined':
                        return typeof value !== 'undefined' && value !== null;
                    break;
                    default:
                        return false;
                }
            }        
        },
        /**
         *  @param {object} Object
         *  @param {string} Value
         *  @return {object} Cast
         */
        CAST: function (value, type) {
            switch (type)
            {
                case 'string':                
                    return String(value);
                break;
                case 'number':
                    return Number(value);
                break;
                case 'int':
                    return parseInt(value);
                break;
                case 'float':
                    return parseFloat(value);
                break;
                case 'boolean':
                    return Boolean(value);
                break;
                case 'bigint':
                    return BigInt(value);
                break;
                default:
                    return value;
            }    
        },
        /**
         *  @param {object} Object
         *  @param {string} Value
         *  @param {number} Base
         *  @return {object} Convert
         */
        CONVERT: function (value, type, base) {
            switch (type)
            {
                case 'int':
                    return parseInt(value, base);
                break;
                case 'string':                
                    return value.toString(base);
                break;            
                default:
                    return value;
            }    
        },
        /**
         *  @param {object} Options
         *  @return {object} AJAX
         */
        AJAX: function(options) {
            const xhr = new XMLHttpRequest();
            
            if (options.username && options.password) { 
                xhr.open(options.method, options.url, options.async, options.username, options.password);
            }
            else { 
                xhr.open(options.method, options.url, true);
            }
            if (options.headers) {
                for (let header in options.headers) {
                    xhr.setRequestHeader(header, options.headers[header]);
                }
            }
            if (options.token) {
                options.headers.Authorization = 'Bearer ' + options.token;
            }
            if (options.timeout) {
                xhr.timeout = options.timeout;
                xhr.ontimeout = function () {
                    options.error('error 408');
                }
            }
            xhr.responseType = options.responseType || 'text';
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = xhr.response;
                        if (options.responseType === 'json') {
                            response = JSON.parse(response);
                        }
                        options.success(response, xhr.status);
                    } else {
                        options.error(xhr.statusText, xhr.status);
                    }
                }
            };
            if (options.cache) {
                const cachedResponse = localStorage.getItem(options.url);
                if (cachedResponse) {
                    options.success(JSON.parse(cachedResponse), 200);
                    return;
                }
            }        
            if (options.cache) {
                xhr.addEventListener('load', function () {
                    localStorage.setItem(options.url, xhr.responseText);
                });
            }
            if (options.progress) {
                xhr.addEventListener('progress', function (event) {
                    options.progress(event.loaded, event.total);
                });
            }
            if (options.abort) {
                xhr.addEventListener('abort', function () {
                    options.abort();
                });
            }
            if (options.cancel) {
                const cancelToken = options.cancelToken;
                if (cancelToken) {
                    cancelToken.promise.then(function () {
                        xhr.abort();
                    });
                }
            }
            if (options.uploadProgress) {
                const upload = xhr.upload;
                if (upload) {
                    upload.addEventListener('progress', function (event) {
                        options.uploadProgress(event.loaded, event.total);
                    });
                }
            }
            if (options.withCredentials) {
                xhr.withCredentials = true;
            }
            if (options.beforeSend) {
                options.beforeSend(xhr);
            }
            if (options.mimeType) {
                xhr.overrideMimeType(options.mimeType);
            }
            if (options.transformRequest) {
                options.data = options.transformRequest(options.data);
            }
            if (options.transformResponse) {
                xhr.addEventListener('load', function () {
                    xhr.response = options.transformResponse(xhr.response);
                });
            }
            if (options.retry) {
                let retries = 0;
                const retryLimit = options.retryLimit || 3;
                const retryInterval = options.retryInterval || 1000;
        
                xhr.addEventListener('error', function () {
                    if (retries < retryLimit) {
                        setTimeout(function () {
                            retries++;
                            if (options.username && options.password) { 
                                xhr.open(options.method, options.url, options.async, options.username, options.password);
                            }
                            else { 
                                xhr.open(options.method, options.url, true);
                            }
                            xhr.send(options.data);
                        }, retryInterval);
                    } else {
                        options.error(xhr.statusText, xhr.status);
                    }
                });
            }
            if (options.redirect) {
                xhr.addEventListener('load', function () {
                    if (xhr.status >= 300 && xhr.status < 400) {
                        const redirectUrl = xhr.getResponseHeader('Location');
                        if (redirectUrl) {
                            options.url = redirectUrl;
                            if (options.username && options.password) { 
                                xhr.open(options.method, options.url, options.async, options.username, options.password);
                            }
                            else { 
                                xhr.open(options.method, options.url, true);
                            }
                            xhr.send(options.data);
                        } else {
                            options.error('404');
                        }
                    } else {
                        options.success(xhr.response, xhr.status);
                    }
                });
            }
            xhr.send(options.data);
        },
        /**
         *  @param {object} Options
         *  @return {object} Fetch
         */
        FETCH: function(options) {
            let init = {
                method: options.method,
                headers: options.headers || {},
                body: options.data || null,
                responseType: options.responseType || 'text',
                cache: options.cache ? 'default' : 'no-store',
                redirect: options.redirect ? 'follow' : 'manual'
            };
            
            if (options.username && options.password) {
                init.headers.Authorization = 'Basic ' + btoa(options.username + ':' + options.password);
            }
            if (options.token) {
                init.headers.Authorization = 'Bearer ' + options.token;
            }
            if (options.timeout) {
                setTimeout(function () {
                    options.error('error 408');
                }, options.timeout);
            }
            if (options.cache) {
                const cachedResponse = localStorage.getItem(options.url);
                if (cachedResponse) {
                    options.success(JSON.parse(cachedResponse), 200);
                }
            }
            if (options.progress) {
                init.onprogress = function (event) {
                    options.progress(event.loaded, event.total);
                }
            }
            if (options.abort) {
                const abortController = new AbortController();
                const signal = abortController.signal;
        
                signal.addEventListener('abort', function () {
                    options.abort();
                });
            }
            if (options.cancel) {
                const abortController = new AbortController();
                const signal = abortController.signal;
                const cancelToken = options.cancelToken;
                if (cancelToken) {
                    cancelToken.promise.then(function () {
                        abortController.abort();
                    });
                }
            }
            if (options.uploadProgress) {
                init.onUploadProgress = function (event) {
                    options.uploadProgress(event.loaded, event.total);
                }
            }
            if (options.withCredentials) {
                init.credentials = 'include';
            }
            if (options.beforeSend) {
                options.beforeSend(init);
            }
            if (options.mimeType) {
                init.headers['Content-Type'] = options.mimeType;
            }
            if (options.transformRequest) {
                init.body = options.transformRequest(init.body);
            }
            if (options.transformResponse) {
                init.onLoad = function () {
                    init.body = options.transformResponse(init.body);
                }
            }
            if (options.retry) {
                let retries = 0;
                const retryLimit = options.retryLimit || 3;
                const retryInterval = options.retryInterval || 1000;
        
                function doFetch() {
                    fetch(options.url, init)
                        .then(function (response) {
                            if (response.status < 200 || response.status >= 300) {
                                throw new Error(response.statusText);
                            }
                            return response;
                        })
                        .then(function (response) {
                            if (options.responseType === 'json') {
                                return response.json();
                            }
                            return response.text();
                        })
                        .then(function (data) {
                            options.success(data, 200);
                        })
                        .catch(function (err) {
                            if (retries < retryLimit) {
                                retries++;
                                setTimeout(doFetch, retryInterval);
                            } else {
                                options.error(err.message || 'Unknown error', 0);
                            }
                        });
                }
                doFetch();
            } else {
                fetch(options.url, init)
                    .then(function (response) {
                        if (response.status < 200 || response.status >= 300) {
                            throw new Error(response.statusText);
                        }
                        return response;
                    })
                    .then(function (response) {
                        if (options.responseType === 'json') {
                            return response.json();
                        }
                        return response.text();
                    })
                    .then(function (data) {
                        options.success(data, 200);
                    })
                    .catch(function (err) {
                        options.error(err.message || 'Unknown error', 0);
                    });
            }
            if (options.redirect) {
                init.onLoad = function () {
                    if (response.status >= 300 && response.status < 400) {
                        const redirectUrl = response.headers.get('Location');
                        if (redirectUrl) {
                            options.url = redirectUrl;
                            fetch(options.url, init)
                                .then(function (response) {
                                    if (response.status < 200 || response.status >= 300) {
                                        throw new Error(response.statusText);
                                    }
                                    return response;
                                })
                                .then(function (response) {
                                    if (options.responseType === 'json') {
                                        return response.json();
                                    }
                                    return response.text();
                                })
                                .then(function (data) {
                                    options.success(data, 200);
                                })
                                .catch(function (err) {
                                    options.error('404');
                                });
                        } else {
                            options.error('404');
                        }
                    } else {
                        options.success(response.body, response.status);
                    }
                };
            }
        },
        /**
         *  @param {object} Options
         *  @return {object} Socket
         */
        SOCKET: function(options) {
            const ws = new WebSocket(options.url);
    
            ws.onopen = function () { 
                if (options.onopen) {
                    options.onopen();
                }
            };
            ws.onerror = function (event) {
                if (options.onerror) {
                    options.onerror(event);
                }
            };
            ws.onclose = function (event) {
                if (options.onclose) {
                    options.onclose(event);
                }
            };
            ws.onmessage = function (event) {
                if (options.onmessage) {
                    options.onmessage(event.data);
                }
            };
            this.send = function (data) {
                ws.send(data);
            };
            this.close = function () {
                ws.close();
            };
        },
        /**
         *  @param {string} Value
         *  @param {string} Options
         */
        LOG: function (value, options = null) {    
            options === null ? console.log(value) : console.log(value, options);
        },
        /**
         *  @param {string} Value
         */
        ERROR: function (value) {
            console.error(value);
        },
        /**
         *  @param {string} Value
         */
        WARN: function (value) {
            console.warn(value);
        },
        CLEAR: function () {
            console.clear();
        }
    };
    for (const key in $) {
        if (typeof $[key] === 'function') {
          window['$' + key] = $[key].bind($);
        }
    }
}();