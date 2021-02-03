/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: myProfile
// ====================================================

export interface myProfile_me_subsriptions {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface myProfile_me {
  __typename: "User";
  id: number;
  email: string;
  password: string;
  role: UserRole;
  subsriptions: myProfile_me_subsriptions[];
}

export interface myProfile {
  me: myProfile_me;
}
