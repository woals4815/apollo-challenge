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

export const Podcast = () => {
    const params = useParams<IPodcastParams>();
    const {data, loading, error} = useQuery<getPodcast, getPodcastVariables>(GET_EPISODES, {
        variables: {
            input: {
                id: +params.id
            }
        }
    });
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
                <div className=" bg-red-200 w-1/2 h-16 fixed rounded-lg top-2 flex justify-between items-center">
                    <span className="text-white ml-20 text-xl">{data?.getPodcast.podcast?.title}</span>
                    <button className={subscribeLoading? "focus:outline-none pointer-events-none": "focus:outline-none"} onClick={onClicked}>    
                        <span className={subscribeLoading? "hidden": `${subscriptionData?.subscriptions.find(item => item.id === +params.id)? "hidden" : "text-white mr-4 "}`}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </span>
                        <div className= {subscribeLoading? `border-t-2 border-b-2 rounded-full border-red-600 h-4 w-4 animate-spin mr-4` : "hidden"}></div>
                        <span className={subscribeLoading? "hidden": ` ${subscriptionData?.subscriptions.find(subscription => subscription.id === +params.id)? "text-white mr-4" : "hidden"}`}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                    </button>                  
                </div>
                <div className="bg-gray-800 w-screen h-screen">
                    {data?.getPodcast.podcast?.episodes.map(episode => (
                        <div className='w-screen flex flex-col items-center justify-center mt-12' key={episode.id}>
                            <div className=' w-80 bg-gradient-to-r from-green-400 to-blue-500 flex flex-col my-3 h-80 rounded-full items-center justify-center relative'>
                                <div className="absolute top-16 flex flex-col">
                                    <span className="text-red-400 text-3xl">{episode.title}</span>
                                    <div className="text-xs mx-4 text-red-400 text-center">{episode.category}</div>
                                </div>
                                <div className="flex flex-col justify-center items-center text-yellow-900 text-5xl mt-12">
                                    <FontAwesomeIcon icon={faPlay} />
                                    <span className="text-xs pt-7">{episode.createdAt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <StatusBar />
            </div>
    )
}