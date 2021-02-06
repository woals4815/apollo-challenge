import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const StatusBar = () => {
    return (
        <div className=" w-4/6 flex fixed z-50 bottom-0 justify-evenly bg-yellow-900 h-12 items-center rounded-md">
            <div className=" text-3xl">
                <Link to="/">
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>
            <div className=" text-3xl">
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>   
    )
}