import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AppealResponse = {
  __typename?: 'AppealResponse';
  appeal?: Maybe<Appeals>;
  error?: Maybe<Scalars['String']['output']>;
};

export type Appeals = {
  __typename?: 'Appeals';
  answer: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  request: Scalars['String']['output'];
  state: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type AppealsResponse = {
  __typename?: 'AppealsResponse';
  appeals?: Maybe<Array<Appeals>>;
  error?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppeal: AppealResponse;
  updateAllToCancelAppeal: AppealsResponse;
  updateToCancelAppeal: AppealResponse;
  updateToDoneAppeal: AppealResponse;
  updateToWorkAppeal: AppealResponse;
};


export type MutationCreateAppealArgs = {
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateToCancelAppealArgs = {
  id: Scalars['Float']['input'];
  message: Scalars['String']['input'];
};


export type MutationUpdateToDoneAppealArgs = {
  id: Scalars['Float']['input'];
  message: Scalars['String']['input'];
};


export type MutationUpdateToWorkAppealArgs = {
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  showAppeals: AppealsResponse;
};


export type QueryShowAppealsArgs = {
  end_date?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
};

export type RegularAppealFragment = { __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string };

export type RegularAppealResponseFragment = { __typename?: 'AppealResponse', error?: string | null, appeal?: { __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string } | null };

export type RegularAppealsResponseFragment = { __typename?: 'AppealsResponse', error?: string | null, appeals?: Array<{ __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string }> | null };

export type CancelAllAppealMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelAllAppealMutation = { __typename?: 'Mutation', updateAllToCancelAppeal: { __typename?: 'AppealsResponse', error?: string | null, appeals?: Array<{ __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string }> | null } };

export type CreateAppealMutationVariables = Exact<{
  title: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;


export type CreateAppealMutation = { __typename?: 'Mutation', createAppeal: { __typename?: 'AppealResponse', error?: string | null, appeal?: { __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string } | null } };

export type ToCancelAppealMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  message: Scalars['String']['input'];
}>;


export type ToCancelAppealMutation = { __typename?: 'Mutation', updateToCancelAppeal: { __typename?: 'AppealResponse', error?: string | null, appeal?: { __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string } | null } };

export type ToDoneAppealMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  message: Scalars['String']['input'];
}>;


export type ToDoneAppealMutation = { __typename?: 'Mutation', updateToDoneAppeal: { __typename?: 'AppealResponse', error?: string | null, appeal?: { __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string } | null } };

export type ToWorkAppealMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type ToWorkAppealMutation = { __typename?: 'Mutation', updateToWorkAppeal: { __typename?: 'AppealResponse', error?: string | null, appeal?: { __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string } | null } };

export type LoadAppealsQueryVariables = Exact<{
  status?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['String']['input']>;
}>;


export type LoadAppealsQuery = { __typename?: 'Query', showAppeals: { __typename?: 'AppealsResponse', error?: string | null, appeals?: Array<{ __typename?: 'Appeals', id: number, createdAt: string, state: number, title: string, request: string, answer: string }> | null } };

export const RegularAppealFragmentDoc = gql`
    fragment RegularAppeal on Appeals {
  id
  createdAt
  state
  title
  request
  answer
}
    `;
export const RegularAppealResponseFragmentDoc = gql`
    fragment RegularAppealResponse on AppealResponse {
  error
  appeal {
    ...RegularAppeal
  }
}
    ${RegularAppealFragmentDoc}`;
export const RegularAppealsResponseFragmentDoc = gql`
    fragment RegularAppealsResponse on AppealsResponse {
  error
  appeals {
    ...RegularAppeal
  }
}
    ${RegularAppealFragmentDoc}`;
export const CancelAllAppealDocument = gql`
    mutation CancelAllAppeal {
  updateAllToCancelAppeal {
    ...RegularAppealsResponse
  }
}
    ${RegularAppealsResponseFragmentDoc}`;

export function useCancelAllAppealMutation() {
  return Urql.useMutation<CancelAllAppealMutation, CancelAllAppealMutationVariables>(CancelAllAppealDocument);
};
export const CreateAppealDocument = gql`
    mutation CreateAppeal($title: String!, $message: String!) {
  createAppeal(title: $title, message: $message) {
    ...RegularAppealResponse
  }
}
    ${RegularAppealResponseFragmentDoc}`;

export function useCreateAppealMutation() {
  return Urql.useMutation<CreateAppealMutation, CreateAppealMutationVariables>(CreateAppealDocument);
};
export const ToCancelAppealDocument = gql`
    mutation ToCancelAppeal($id: Float!, $message: String!) {
  updateToCancelAppeal(id: $id, message: $message) {
    ...RegularAppealResponse
  }
}
    ${RegularAppealResponseFragmentDoc}`;

export function useToCancelAppealMutation() {
  return Urql.useMutation<ToCancelAppealMutation, ToCancelAppealMutationVariables>(ToCancelAppealDocument);
};
export const ToDoneAppealDocument = gql`
    mutation ToDoneAppeal($id: Float!, $message: String!) {
  updateToDoneAppeal(id: $id, message: $message) {
    ...RegularAppealResponse
  }
}
    ${RegularAppealResponseFragmentDoc}`;

export function useToDoneAppealMutation() {
  return Urql.useMutation<ToDoneAppealMutation, ToDoneAppealMutationVariables>(ToDoneAppealDocument);
};
export const ToWorkAppealDocument = gql`
    mutation ToWorkAppeal($id: Float!) {
  updateToWorkAppeal(id: $id) {
    ...RegularAppealResponse
  }
}
    ${RegularAppealResponseFragmentDoc}`;

export function useToWorkAppealMutation() {
  return Urql.useMutation<ToWorkAppealMutation, ToWorkAppealMutationVariables>(ToWorkAppealDocument);
};
export const LoadAppealsDocument = gql`
    query LoadAppeals($status: Int, $start_date: String, $end_date: String) {
  showAppeals(status: $status, start_date: $start_date, end_date: $end_date) {
    ...RegularAppealsResponse
  }
}
    ${RegularAppealsResponseFragmentDoc}`;

export function useLoadAppealsQuery(options?: Omit<Urql.UseQueryArgs<LoadAppealsQueryVariables>, 'query'>) {
  return Urql.useQuery<LoadAppealsQuery, LoadAppealsQueryVariables>({ query: LoadAppealsDocument, ...options });
};