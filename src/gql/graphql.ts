/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Alternativa = {
  __typename?: 'Alternativa';
  correta: Scalars['Boolean']['output'];
  enunciado: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CasoClinico = {
  __typename?: 'CasoClinico';
  enunciado: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  questoesObjetivas: Array<QuestaoObjetiva>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCasoClinico: CasoClinico;
};


export type MutationCreateCasoClinicoArgs = {
  enunciado: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  casoClinico: CasoClinico;
  casosClinicos: Array<CasoClinico>;
};


export type QueryCasoClinicoArgs = {
  id: Scalars['Int']['input'];
};

export type QuestaoObjetiva = {
  __typename?: 'QuestaoObjetiva';
  alternativas: Array<Alternativa>;
  enunciado: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type GetQuestionForAdminQueryVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type GetQuestionForAdminQuery = { __typename?: 'Query', casoClinico: { __typename?: 'CasoClinico', enunciado: string, questoesObjetivas: Array<{ __typename?: 'QuestaoObjetiva', id: string, enunciado: string, alternativas: Array<{ __typename?: 'Alternativa', id: string, enunciado: string, correta: boolean }> }> } };

export type GetQuestionForUserQueryVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type GetQuestionForUserQuery = { __typename?: 'Query', casoClinico: { __typename?: 'CasoClinico', enunciado: string, questoesObjetivas: Array<{ __typename?: 'QuestaoObjetiva', id: string, enunciado: string, alternativas: Array<{ __typename?: 'Alternativa', id: string, enunciado: string, correta: boolean }> }> } };


export const GetQuestionForAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuestionForAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"casoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"questoesObjetivas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"alternativas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"correta"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionForAdminQuery, GetQuestionForAdminQueryVariables>;
export const GetQuestionForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuestionForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"casoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"questoesObjetivas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"alternativas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"correta"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionForUserQuery, GetQuestionForUserQueryVariables>;