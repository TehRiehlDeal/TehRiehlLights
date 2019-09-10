var httpClient = {

    get: function (url, data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            var readyState = xhr.readyState;

            if (readyState == 4) {
                callback(xhr);
            }
        };

        var queryString = '';
        if (typeof data === 'object') {
            for (var propertyName in data) {
                queryString += (queryString.length === 0 ? '' : '&') + propertyName + '=' + encodeURIComponent(data[propertyName]);
            }
        }

        if (queryString.length !== 0) {
            url += (url.indexOf('?') === -1 ? '?' : '&') + queryString;
        }

        xhr.open('GET', url, true);
        xhr.withCredentials = true;
        xhr.send(null);
    },

    post: function (url, data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            var readyState = xhr.readyState;

            if (readyState == 4) {
                callback(xhr);
            }
        };

        var queryString = '';
        if (typeof data === 'object') {
            for (var propertyName in data) {
                queryString += (queryString.length === 0 ? '' : '&') + propertyName + '=' + encodeURIComponent(data[propertyName]);
            }
        } else {
            queryString = data
        }

        xhr.open('POST', url, false);
        xhr.withCredentials = false;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(queryString);
    }
};