import { gql, useMutation, useQuery } from "@apollo/client";
import {allPodcastsQuery} from '../__generated__/allPodcastsQuery';
import React from 'react';
import { Link } from "react-router-dom";
import { Podcast } from "../components/podcast";

const ALL_PODCASTS_QUERY = gql`
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
        <div>
            {data.getAllPodcasts.podcasts?.map((podcast) => (
                <Podcast 
                    id={podcast.id + ""}
                    title={podcast.title}
                    category={podcast.category}
                    createdAt={podcast.createdAt}
                />
            ))}
        </div>
    )
}