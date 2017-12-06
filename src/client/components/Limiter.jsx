import React from 'react';
import ReactDom from 'react-dom';

export default function Limiter(props) {
    const { handleLimitChange, limit } = props;
    return (
        <div className="form-group">
            <label htmlFor="inputLimit" className="control-label col-md-9">Projects per page: </label>
            <input id="limitNumber" className="col-md-3" type="number" min='1' max="10" value={limit} onChange={handleLimitChange} />
        </div>
    )
}

