import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import {getPodcast, getPodcastVariables} from '../__generated__/getPodcast';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlay, faPlus, faSubscript } from '@fortawesome/free-solid-svg-icons';
import { StatusBar } from '../components/status-bar';
import {subscribe, subscribeVariables} from '../__generated__/subscribe';
import {subscripiton} from '../__generated__/subscripiton';
import { Helmet } from 'react-helmet-async';

interface IPodcastParams {
    id: string;
}

export const GET_EPISODES = gql`
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
/*
export const SUBSCRIBE = gql`
    mutation subscribe($input: ToggleSubscribeInput!){
        toggleSubscribe(input: $input){
            ok
            error
        }
    }
`;
export const SUBSCRIPTION = gql`
    query subscripiton{
        subscriptions{
            id
            title
        }
    }
`;
*/
export const Podcast = () => {
    const params = useParams<IPodcastParams>();
    const {data, loading, error} = useQuery<getPodcast, getPodcastVariables>(GET_EPISODES, {
        variables: {
            input: {
                id: +params.id
            }
        }
    });
    /*
    const [subscribe, {data: subscribeData, loading: subscribeLoading}] = useMutation<subscribe, subscribeVariables>(SUBSCRIBE, {
        variables: {
            input: {
                podcastId: +params.id
            }
        }
    });
    const  {data: subscriptionData, refetch} = useQuery<subscripiton>(SUBSCRIPTION);
    const onClicked = async() => {
        await subscribe({
            variables: {
                input: {
                    podcastId: +params.id
                }
            }
        });
        const result = await refetch();
    };
    */
    
    if(!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }
    return (
            <div className="flex flex-col justify-center items-center">
                <Helmet>
                    <title>{data.getPodcast.podcast?.title} | Podcast</title>
                </Helmet>
                
                <div className=" bg-gray-800 w-1/2 h-16 fixed rounded-lg top-0 flex justify-between items-center">
                    {/*<span className="text-white ml-20 text-xl">{data?.getPodcast.podcast?.title}</span>
                    <button className=" focus:outline-none" onClick={onClicked}>    
                        <span className={`text-white mr-4 ${subscriptionData?.subscriptions.find(item => item.id === +params.id)? "hidden" : ""}`}><FontAwesomeIcon icon={faPlus} /></span>
                        <span className={`text-white mr-4 ${subscriptionData?.subscriptions.find(subscription => subscription.id === +params.id)? "" : "hidden"}`}><FontAwesomeIcon icon={faCheck} /></span>
    </button>*/}                    
                </div>
                {data?.getPodcast.podcast?.episodes.map(episode => (
                    <div className='w-screen flex flex-col items-center justify-center mt-12' key={episode.id}>
                        <div className=' lg:max-w-screen-2xl w-4/5 bg-blue-300 flex flex-col my-3 h-80 rounded-md'>
                            <div className="flex justify-between mt-2  mx-4">
                                <span className="text-red-400 text-xl lg:text-7xl">{episode.title}</span>
                                <span className="text-xs text-gray-400 lg:text-xl">{episode.createdAt}</span>
                            </div>
                            <div className="text-xs  mx-4 text-red-400 lg:text-2xl">{episode.category}</div>
                            <div className="flex justify-center items-center text-gray-600 text-xl">
                                <FontAwesomeIcon icon={faPlay} />
                            </div>
                        </div>
                    </div>
                ))}
                <StatusBar />
            </div>
    )
}