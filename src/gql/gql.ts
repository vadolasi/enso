/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query getQuestionFoAdmin($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n": types.GetQuestionFoAdminDocument,
    "\n  query getQuestionForAdmin($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n": types.GetQuestionForAdminDocument,
    "\n  mutation CreateCasoClinico(\n    $enunciado: String!,\n    $enunciadoDelta: String!,\n    $questoes: [CreateQuestaoInput!]!\n  ) {\n    createCasoClinico(\n      enunciado: $enunciado\n      enunciadoDelta: $enunciadoDelta\n      questoes: $questoes\n    ) {\n      id\n    }\n  }\n": types.CreateCasoClinicoDocument,
    "\n  query GetCasosClinicosForAdmin {\n    casosClinicos {\n      id\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n        }\n      }\n    }\n  }\n": types.GetCasosClinicosForAdminDocument,
    "\n  mutation ResponderCasoClinico($id: Int!, $respostas: [Int!]!) {\n    responderCasoClinico(id: $id, respostas: $respostas) {\n      corretas\n      total\n    }\n  }\n": types.ResponderCasoClinicoDocument,
    "\n  query getQuestionForUser($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n": types.GetQuestionForUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getQuestionFoAdmin($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getQuestionFoAdmin($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getQuestionForAdmin($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getQuestionForAdmin($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCasoClinico(\n    $enunciado: String!,\n    $enunciadoDelta: String!,\n    $questoes: [CreateQuestaoInput!]!\n  ) {\n    createCasoClinico(\n      enunciado: $enunciado\n      enunciadoDelta: $enunciadoDelta\n      questoes: $questoes\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCasoClinico(\n    $enunciado: String!,\n    $enunciadoDelta: String!,\n    $questoes: [CreateQuestaoInput!]!\n  ) {\n    createCasoClinico(\n      enunciado: $enunciado\n      enunciadoDelta: $enunciadoDelta\n      questoes: $questoes\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCasosClinicosForAdmin {\n    casosClinicos {\n      id\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCasosClinicosForAdmin {\n    casosClinicos {\n      id\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResponderCasoClinico($id: Int!, $respostas: [Int!]!) {\n    responderCasoClinico(id: $id, respostas: $respostas) {\n      corretas\n      total\n    }\n  }\n"): (typeof documents)["\n  mutation ResponderCasoClinico($id: Int!, $respostas: [Int!]!) {\n    responderCasoClinico(id: $id, respostas: $respostas) {\n      corretas\n      total\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getQuestionForUser($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getQuestionForUser($questionId: Int!) {\n    casoClinico(id: $questionId) {\n      enunciado\n      questoes {\n        id\n        enunciado\n        alternativas {\n          id\n          enunciado\n          correta\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;