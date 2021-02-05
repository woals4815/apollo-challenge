import { gql, useMutation, useQuery } from "@apollo/client";
import {allPodcastsQuery} from '../__generated__/allPodcastsQuery';
import React from 'react';
import { Link } from "react-router-dom";
import { Podcast } from "../components/podcast";
import { StatusBar } from "../components/status-bar";
import { User } from "../components/user";
import { Helmet } from "react-helmet-async";

export const ALL_PODCASTS_QUERY = gql`
    query allPodcastsQuery{
        getAllPodcasts{
            ok
            error
            podcasts{
                id
                title
                category
                createdAt
            }
        }
    }
`;


export const Podcasts = () => {
    const { data, loading, error} = useQuery<allPodcastsQuery>(ALL_PODCASTS_QUERY)
    if(!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }
    return (
        <div className="flex flex-col justify-center items-center bg-gray-800 pt-4">
            <Helmet>
                <title>Home | Podcast</title>
            </Helmet>
            {/*<User />*/}
            {data.getAllPodcasts.podcasts?.map((podcast) => (
                <Podcast
                    key={podcast.id} 
                    id={podcast.id + ""}
                    title={podcast.title}
                    category={podcast.category}
                    createdAt={podcast.createdAt}
                />
            ))}
            <StatusBar />
        </div>
    )
}