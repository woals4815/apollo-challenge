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
    <Link to={`/podcasts/${id}`}>
        <div className='w-screen flex flex-col items-center'>
            <div className=' lg:max-w-screen-2xl w-4/5 bg-blue-300 flex flex-col my-3 h-80 rounded-md'>
                <div className="flex justify-between mt-2  mx-4">
                    <span className="text-red-400 text-xl">{title}</span>
                    <span className="text-xs text-gray-400">{createdAt}</span>
                </div>
                <div className="text-xs  mx-4 text-red-400">{category}</div>
                <div className=" text-6xl flex justify-center mt-20 text-red-400">
                    <FontAwesomeIcon icon={faPlay} />
                </div>
            </div>
        </div>
    </Link>
)