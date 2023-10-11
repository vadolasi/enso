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
  questoes: Array<Questao>;
};

export type CreateAlternativaInput = {
  correta: Scalars['Boolean']['input'];
  enunciado: Scalars['String']['input'];
  enunciadoDelta: Scalars['String']['input'];
};

export type CreateQuestaoInput = {
  alternativas: Array<CreateAlternativaInput>;
  enunciado: Scalars['String']['input'];
  enunciadoDelta: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCasoClinico: CasoClinico;
  responderCasoClinico: Resultado;
  updateCasoClinico: CasoClinico;
};


export type MutationCreateCasoClinicoArgs = {
  enunciado: Scalars['String']['input'];
  enunciadoDelta: Scalars['String']['input'];
  questoes: Array<CreateQuestaoInput>;
};


export type MutationResponderCasoClinicoArgs = {
  id: Scalars['Int']['input'];
  respostas: Array<Scalars['Int']['input']>;
};


export type MutationUpdateCasoClinicoArgs = {
  data: UpdateCasoClinicoInput;
  id: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  casoClinico: CasoClinico;
  casosClinicos: Array<CasoClinico>;
};


export type QueryCasoClinicoArgs = {
  id: Scalars['Int']['input'];
};

export type Questao = {
  __typename?: 'Questao';
  alternativas: Array<Alternativa>;
  enunciado: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Resultado = {
  __typename?: 'Resultado';
  corretas: Array<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type UpdateCasoClinicoInput = {
  enunciado?: InputMaybe<Scalars['String']['input']>;
  enunciadoDelta?: InputMaybe<Scalars['String']['input']>;
  questoes?: InputMaybe<UpdateCasoClinicoQuestaoInput>;
};

export type UpdateCasoClinicoQuestao = {
  alternativas?: InputMaybe<UpdateCasoClinicoQuestaoAlternativaInput>;
  enunciado?: InputMaybe<Scalars['String']['input']>;
  enunciadoDelta?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateCasoClinicoQuestaoAlternativa = {
  correta?: InputMaybe<Scalars['Boolean']['input']>;
  enunciado?: InputMaybe<Scalars['String']['input']>;
  enunciadoDelta?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

export type UpdateCasoClinicoQuestaoAlternativaInput = {
  create?: InputMaybe<Array<CreateAlternativaInput>>;
  delete?: InputMaybe<Array<Scalars['ID']['input']>>;
  update?: InputMaybe<Array<UpdateCasoClinicoQuestaoAlternativa>>;
};

export type UpdateCasoClinicoQuestaoInput = {
  create?: InputMaybe<Array<CreateQuestaoInput>>;
  delete?: InputMaybe<Array<Scalars['ID']['input']>>;
  id: Scalars['Int']['input'];
  update?: InputMaybe<Array<UpdateCasoClinicoQuestao>>;
};

export type GetQuestionFoAdminQueryVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type GetQuestionFoAdminQuery = { __typename?: 'Query', casoClinico: { __typename?: 'CasoClinico', enunciado: string, questoes: Array<{ __typename?: 'Questao', id: string, enunciado: string, alternativas: Array<{ __typename?: 'Alternativa', id: string, enunciado: string, correta: boolean }> }> } };

export type GetQuestionForAdminQueryVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type GetQuestionForAdminQuery = { __typename?: 'Query', casoClinico: { __typename?: 'CasoClinico', enunciado: string, questoes: Array<{ __typename?: 'Questao', id: string, enunciado: string, alternativas: Array<{ __typename?: 'Alternativa', id: string, enunciado: string, correta: boolean }> }> } };

export type CreateCasoClinicoMutationVariables = Exact<{
  enunciado: Scalars['String']['input'];
  enunciadoDelta: Scalars['String']['input'];
  questoes: Array<CreateQuestaoInput> | CreateQuestaoInput;
}>;


export type CreateCasoClinicoMutation = { __typename?: 'Mutation', createCasoClinico: { __typename?: 'CasoClinico', id: string } };

export type GetCasosClinicosForAdminQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCasosClinicosForAdminQuery = { __typename?: 'Query', casosClinicos: Array<{ __typename?: 'CasoClinico', id: string, enunciado: string, questoes: Array<{ __typename?: 'Questao', id: string, enunciado: string, alternativas: Array<{ __typename?: 'Alternativa', id: string, enunciado: string }> }> }> };

export type ResponderCasoClinicoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  respostas: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type ResponderCasoClinicoMutation = { __typename?: 'Mutation', responderCasoClinico: { __typename?: 'Resultado', corretas: Array<number>, total: number } };

export type GetQuestionForUserQueryVariables = Exact<{
  questionId: Scalars['Int']['input'];
}>;


export type GetQuestionForUserQuery = { __typename?: 'Query', casoClinico: { __typename?: 'CasoClinico', enunciado: string, questoes: Array<{ __typename?: 'Questao', id: string, enunciado: string, alternativas: Array<{ __typename?: 'Alternativa', id: string, enunciado: string, correta: boolean }> }> } };


export const GetQuestionFoAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuestionFoAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"casoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"questoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"alternativas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"correta"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionFoAdminQuery, GetQuestionFoAdminQueryVariables>;
export const GetQuestionForAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuestionForAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"casoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"questoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"alternativas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"correta"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionForAdminQuery, GetQuestionForAdminQueryVariables>;
export const CreateCasoClinicoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCasoClinico"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enunciado"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"enunciadoDelta"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questoes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateQuestaoInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCasoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"enunciado"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enunciado"}}},{"kind":"Argument","name":{"kind":"Name","value":"enunciadoDelta"},"value":{"kind":"Variable","name":{"kind":"Name","value":"enunciadoDelta"}}},{"kind":"Argument","name":{"kind":"Name","value":"questoes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questoes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCasoClinicoMutation, CreateCasoClinicoMutationVariables>;
export const GetCasosClinicosForAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCasosClinicosForAdmin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"casosClinicos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"questoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"alternativas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCasosClinicosForAdminQuery, GetCasosClinicosForAdminQueryVariables>;
export const ResponderCasoClinicoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResponderCasoClinico"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"respostas"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"responderCasoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"respostas"},"value":{"kind":"Variable","name":{"kind":"Name","value":"respostas"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"corretas"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ResponderCasoClinicoMutation, ResponderCasoClinicoMutationVariables>;
export const GetQuestionForUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getQuestionForUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"casoClinico"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"questoes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"alternativas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"enunciado"}},{"kind":"Field","name":{"kind":"Name","value":"correta"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionForUserQuery, GetQuestionForUserQueryVariables>;