/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allPodcastsQuery
// ====================================================

export interface allPodcastsQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  createdAt: any;
}

export interface allPodcastsQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  ok: boolean;
  error: string | null;
  podcasts: allPodcastsQuery_getAllPodcasts_podcasts[] | null;
}

export interface allPodcastsQuery {
  getAllPodcasts: allPodcastsQuery_getAllPodcasts;
}
