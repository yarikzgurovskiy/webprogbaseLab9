const fetchRequest = async (method, path, body, stringify = true) => {
    let headers = {
        'Accept': 'application/json',
        //'Authorization': `Berear ${Auth.getToken()}`
    }
    if (method !== 'get' && stringify) headers['Content-Type'] = 'application/json'
    let options = {
        headers,
        method,
        credentials : 'include'
    }
    if (body) options.body = stringify ? JSON.stringify(body) : body
    return fetch(path, options)
}

const apiClient = async (method, path, body, stringify) => {
    const response = await fetchRequest(method, path, body, stringify);
    if (response.status >= 500) throw new Error('Internal server error');
    const json = await response.json();
    //if (!json.success) throw new Error(json.message);
    return json;
}

module.exports = apiClient;