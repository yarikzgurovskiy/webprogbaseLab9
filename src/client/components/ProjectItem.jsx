import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function ProjectItem(props) {
    const { project, handleDelete } = props;

    let deleteModal = (
        <div className="modal fade" id={`confirmDeleteModal${project.id}`} role="dialog" aria-labelledby={`myModalLabel${project.id}`}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id={`myModalLabel${project.id}`}>Confirm removing</h4>
                    </div>
                    <div className="modal-body">Do you want to delete this project?</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button onClick={() => handleDelete(project.id)} data-dismiss="modal" type="button" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <li className="media">
            {deleteModal}
            <div className="media-left">
                <a href={`/projects/${project.id}`}>
                    <img className="media-object img-rounded" width="200" height="200" src={project.imageUrl} alt={`${project.name} logo`} />
                </a>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{project.name}</h4>
                <p>{project.preview}</p>
                <form action={`/projects/${project.id}`}>
                    <button className="btn btn-info"><span>Read more...</span></button>
                </form>
                <hr className="divider" />
                <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target={`#confirmDeleteModal${project.id}`}>Delete</button>
            </div>
        </li>

    );
};

