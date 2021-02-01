import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {getPodcast, getPodcastVariables} from '../__generated__/getPodcast';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSubscript } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from '../components/status-bar';

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
        <div className="flex flex-col justify-center items-center">
                <div className=" bg-gray-800 w-1/2 h-16 fixed rounded-lg top-0 flex justify-between items-center">
                    <span className="text-white ml-20">{data?.getPodcast.podcast?.title}</span>
                    <span className="text-white mr-4"><FontAwesomeIcon icon={faPlus} /></span>
                </div>
                {data?.getPodcast.podcast?.episodes.map(episode => (
                    <div className='w-screen flex flex-col items-center justify-center mt-12'>
                        <div className=' lg:max-w-screen-2xl w-4/5 bg-blue-300 flex flex-col my-3 h-80 rounded-md'>
                        <div className="flex justify-between mt-2  mx-4">
                            <span className="text-red-400 text-xl lg:text-7xl">{episode.title}</span>
                            <span className="text-xs text-gray-400 lg:text-xl">{episode.createdAt}</span>
                        </div>
                        <div className="text-xs  mx-4 text-red-400 lg:text-2xl">{episode.category}</div>
                        <div className="flex justify-center mt-56 text-gray-600 text-xl">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
                ))}
            <StatusBar />
        </div>
    )
}