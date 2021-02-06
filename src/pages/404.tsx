import React from 'react';
import { Link } from 'react-router-dom';


export const NotFound = () => {
    return(
    <div>
        <h2>Page not found.</h2>
        <h4>
            The page you are looking for is not found
        </h4>
        <Link to='/'>
            Go to Home &larr;
        </Link>
    </div>
    )
}