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
        <div className='flex flex-col items-center w-screen mb-6'>
            <Link to={`/podcasts/${id}`} className='w-80 h-80 rounded-full'>
                <div className=' w-80 bg-gradient-to-r from-green-400 to-blue-500 flex flex-col my-3 h-80 rounded-full items-center justify-center relative'>
                    <div className=" justify-between mt-2  mx-4 items-center absolute top-16 flex flex-col">
                        <span className="text-red-400 text-xl">{title}</span>
                    </div>
                    <div className="text-sm  mx-4 text-red-400 absolute top-12">{category}</div>
                    <div className=" text-6xl flex pl-4 text-red-400">
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <div>
                        <span className="text-xs text-black absolute bottom-16 left-24">{createdAt}</span>
                    </div>
                </div>
            </Link>
        </div>
)