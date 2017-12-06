import React from 'react';
import ReactDom from 'react-dom';

import ProjectList from './../components/ProjectList'
import CreateForm from './../components/CreateForm';
import SearchBar from './../components/SearchBar';
import Pagination from './../components/Pagination';

let request = require('./../utils/request')

export default class ProjectsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            limit: 3,
            filter: "",
            pages: 0,
            currentPage: 1,
            newProject: {
                name: "",
                preview: "",
                about: "",
                lead: "",
                members: 1,
                team_velocity: 1,
                image: {
                    data: '',
                    mimetype: ""
                }
            }
        };
    }

    loadProjects = () => {
        request.getProjects(this.state.filter, this.state.limit, this.state.currentPage)
            .then(data => {
                this.setState({
                    projects: data.projects,
                    pages: data.parts,
                    limit: data.limit
                });
            });
    }

    componentDidMount() {
        this.loadProjects();
    }

    handleLimitChange = (event) => {
        this.setState({ limit: event.target.value, currentPage: 1 }, this.loadProjects);
    }
    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value, currentPage: 1 }, this.loadProjects);
    }
    handleFilterClean = () => {
        this.setState({ filter: "", currentPage: 1 }, this.loadProjects);
    }

    handlePageChanged = (e) => {
        e.preventDefault();
        this.setState({ currentPage: parseInt(e.target.text) }, this.loadProjects);
    }
    handleNextPage = (e) => {
        e.preventDefault();
        this.setState((prevState) => { return { currentPage: ++prevState.currentPage }; }, this.loadProjects);
    }
    handlePrevPage = (e) => {
        e.preventDefault();
        this.setState((prevState) => { return { currentPage: --prevState.currentPage }; }, this.loadProjects);
    }

    handleProjectDelete = (id) => {
        console.log(id);
        request.deleteProject(id)
            .then(response => {
                console.log(response);
                this.loadProjects();
            });
    }

    onSubmitCreateForm = (e) => {
        e.preventDefault();
        request.createProject(this.state.newProject)
            .then(response => {
                console.log(response);
                this.loadProjects();
            });
    }

    onChangeImage = (e) => {
        const reader = new FileReader();
        let img = e.target.files[0];
        reader.onloadend = () => {
            let image = Object.assign({}, { mimetype: img.type, data: btoa(reader.result) });
            let toUpdate = Object.assign(this.state.newProject, { image });
            this.setState({ newProject: toUpdate });
        }
        reader.readAsBinaryString(img);

        console.log('Image changed');
    }

    onChangeInputCreateForm = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let proj = Object.assign(this.state.newProject, { [`${name}`]: value });
        this.setState({ newProject: proj });
    }

    render() {
        const pagination = this.state.pages > 1
            ? (<Pagination
                currentPage={this.state.currentPage}
                pages={this.state.pages}
                handleNextPage={this.handleNextPage}
                handlePrevPage={this.handlePrevPage}
                handlePageChanged={this.handlePageChanged}
            />)
            : '';

        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <SearchBar
                                limit={this.state.limit}
                                filter={this.state.filter}
                                handleFilterChange={this.handleFilterChange}
                                handleFilterClean={this.handleFilterClean}
                                handleLimitChange={this.handleLimitChange}
                            />
                        </div>
                    </div>
                    <hr className="divider" />
                    <ProjectList
                        projects={this.state.projects}
                        handleProjectDelete={this.handleProjectDelete}
                    />
                    {pagination}
                </div>
                <div className="col-md-4">
                    <CreateForm
                        onSubmitForm={this.onSubmitCreateForm}
                        onChangeImage={this.onChangeImage}
                        onChangeInput={this.onChangeInputCreateForm}
                        projectValues={this.state.newProject}
                    />
                </div>
            </div>
        )
    }
}