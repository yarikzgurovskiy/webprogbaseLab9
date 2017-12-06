import React from 'react';
import ReactDom from 'react-dom';

export default function Filter(props) {
    const { filter, handleFilterChange, handleFilterClean } = props;
    return (
        <div className="input-group" role="search">
            <input id="filterString" type="text" className="form-control" placeholder="Type to search..." onChange={handleFilterChange} value={filter} />
            <div className="input-group-btn">
                <button className="btn btn-default" type="button" id="clearFilter" onClick={handleFilterClean} ><i className="glyphicon glyphicon-erase"></i></button>
            </div>
        </div>
    )
}