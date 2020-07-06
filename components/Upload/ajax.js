function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function getError(action, options, xhr) {
    let msg;
    if (xhr.response) {
        msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
        msg = `${xhr.responseText}`;
    } else {
        msg = `fail to post ${action} ${xhr.status}`;
    }

    const err = new Error(msg);
    err.status = xhr.status;
    err.method = 'post';
    err.url = action;
    return err;
}

export default function ajax(options) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }
    const xhr = new XMLHttpRequest();
    const action = options.action;

    if (xhr.upload) {
        // console.log(xhr.upload)
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            options.onProgress(e);
        };
    }
    const formData = new FormData();
    xhr.onerror = function error(e) {
        options.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return options.onError(getError(action, options, xhr));
        }

        options.onSuccess(getBody(xhr));
    };
    if (options.data) {
        console.log(Object.keys(options.data));
        Object.keys(options.data).forEach(item => {
            formData.append(item, options.data[item]);
        });
    }
    formData.append(options.filename, options.file);

    xhr.open('post', action, true);

    if (options.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }
    xhr.send(formData);
    return xhr;
}
