let api = require('./apiClient');

const getProjects = async (filter, limit, page) => {
    return await api('get', `/api/v1/projects?p=${page}&limit=${limit}&q=${filter}`);
};

const deleteProject = async (id) => {
    return await api('post', `/api/v1/projects/${id}`);
}

const createProject = async(project) => {
    return await api('post', '/api/v1/projects', project);
}

module.exports = {
    getProjects,
    deleteProject,
    createProject
}