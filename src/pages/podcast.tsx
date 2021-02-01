import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {getPodcast, getPodcastVariables} from '../__generated__/getPodcast';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface IPodcastParams {
    id: string;
}

const GET_EPISODES = gql`
    query getPodcast($input: PodcastSearchInput!){
        getPodcast(input: $input){
            ok
            error
            podcast{
                id
                title
                category
                createdAt
                episodes{
                    id
                    title
                    category
                    createdAt
                }
            }
        }
    }
`

export const Podcast = () => {
    const params = useParams<IPodcastParams>();
    const {data, loading, error} = useQuery<getPodcast, getPodcastVariables>(GET_EPISODES, {
        variables: {
            input: {
                id: +params.id
            }
        }
    });
    return (
        <div>
            {data?.getPodcast.podcast?.episodes.map(episode => (
                <div className='w-screen flex flex-col items-center'>
                    <div className=' lg:max-w-screen-2xl w-4/5 bg-blue-300 flex flex-col my-3 h-80 rounded-md'>
                    <div className="flex justify-between mt-2  mx-4">
                        <span className="text-red-400 text-xl">{episode.title}</span>
                        <span className="text-xs text-gray-400">{episode.createdAt}</span>
                    </div>
                    <div className="text-xs  mx-4 text-red-400">{episode.category}</div>
                    <div className="flex justify-center mt-56 text-gray-600 text-xl">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
            ))}
        </div>
    )
}