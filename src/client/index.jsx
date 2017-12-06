import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ProjectsPage from './containers/ProjectsPage';

function App(props) {
    return (
        <ProjectsPage />
    )
}

ReactDOM.render(<App />, document.getElementById('app'));