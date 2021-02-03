import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface IPodcastProps {
    id: string;
    title: string;
    category: string;
    createdAt: string;
}

export const Podcast: React.FC<IPodcastProps> =({
    id,
    title,
    category,
    createdAt
}) => (
        <div className='flex flex-col items-center w-screen'>
            <Link to={`/podcasts/${id}`} className='w-4/5'>
                <div className=' flex border-2 border-blue-300 flex-col my-3 h-80 bg-gray-300 rounded-md justify'>
                    <div className="flex justify-between mt-2  mx-4 items-center">
                        <span className="text-red-400 text-xl lg:text-3xl">{title}</span>
                        <span className="text-xs text-gray-400 lg:text-xl">{createdAt}</span>
                    </div>
                    <div className="text-xs  mx-4 text-red-400 lg:text-2xl">{category}</div>
                    <div className=" text-6xl flex mt-20 lg:mt-16 justify-center text-red-400 items-center">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                </div>
            </Link>
        </div>
)