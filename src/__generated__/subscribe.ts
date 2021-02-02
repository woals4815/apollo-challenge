/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: subscribe
// ====================================================

export interface subscribe_toggleSubscribe {
  __typename: "ToggleSubscribeOutput";
  ok: boolean;
  error: string | null;
}

export interface subscribe {
  toggleSubscribe: subscribe_toggleSubscribe;
}

export interface subscribeVariables {
  input: ToggleSubscribeInput;
}
