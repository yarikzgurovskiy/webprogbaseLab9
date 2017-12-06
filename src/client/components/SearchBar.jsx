import React from 'react';
import ReactDom from 'react-dom';

import Limiter from './Limiter';
import Filter from './Filter';

export default function SearchBar(props) {
    const { filter, limit, handleFilterChange, handleFilterClean, handleLimitChange } = props;
    return (
        <div className="form-horizontal">
            <Limiter
                limit={limit}
                handleLimitChange={handleLimitChange}
            />
            <Filter
                filter={filter}
                handleFilterChange={handleFilterChange}
                handleFilterClean={handleFilterClean}
            />
        </div>
    )
}

