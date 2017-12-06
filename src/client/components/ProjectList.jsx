import React from 'react';
import ReactDom from 'react-dom';
import ProjectItem from './ProjectItem';

export default function ProjectList(props) {
    const { projects, handleProjectDelete } = props;
    const projectItems = projects.length > 0
        ? projects.map(proj => {
            return <ProjectItem key={proj.id} project={proj} handleDelete={handleProjectDelete} />
        })
        : (<h1>No such projects</h1>);

    return (
        <ul className="media-list">
            {projectItems}
        </ul>
    );
}