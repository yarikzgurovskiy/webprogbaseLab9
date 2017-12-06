import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default function CreateForm(props) {
    const { onSubmitForm, onChangeImage, onChangeInput, projectValues } = props;
    return (
        <div className="panel panel-default">
            <div className="panel-heading">
                <h3><center>New project</center></h3>
            </div>
            <div className="panel-body">
                <form role="form" onSubmit={onSubmitForm}>
                    <br />
                    <div className="form-group">
                        <label className="control-label">Project Name</label>
                        <input type="text" value={projectValues.name} onChange={onChangeInput} className="form-control" name="name" placeholder=" Project Name" required />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Short preview</label>
                        <textarea onChange={onChangeInput} value={projectValues.preview} className="form-control" rows="3" cols="30" style={{ 'maxWidth': `100%` }} name="preview" placeholder="Short preview" required/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Lead</label>
                        <input onChange={onChangeInput} value={projectValues.lead} type="text" className="form-control" name="lead" placeholder="Lead Fullname" required title="Name Surname" pattern="^[A-Z]+[a-z]+\s+[A-Z]+[a-z]+$" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Count of members</label>
                        <input onChange={onChangeInput} value={projectValues.members} type="number" className="form-control" name="members" min='1' max="50" required />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Team velocity</label>
                        <input onChange={onChangeInput} value={projectValues.team_velocity} type="number" className="form-control" name="team_velocity" min='1' required />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Additional Info</label>
                        <textarea onChange={onChangeInput} value={projectValues.about} className="form-control" rows="5" cols="30" style={{ 'maxWidth': `100%` }} name="about" placeholder="About Your Project" required/>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Image</label>
                        <input type="file" onChange={onChangeImage} className="form-control" name="image" accept="image/*" placeholder="Load image" required />
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-success btn-block" value="Create project" />
                    </div>
                </form>
            </div>
        </div>
    )

}

