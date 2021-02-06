import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';



export const User = () => {
    return (
                <Link to="/user">
                    <div className="bg-red-200 h-10 w-10 flex justify-center items-center rounded-full z-50 fixed border-2 border-purple-300 right-8 animate-bounce">
                        <span className="text-gray-500"><FontAwesomeIcon icon={faUser} /></span>
                    </div>
                </Link>
    )
}