import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./schema.gql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: []
    }
  }
}

export default config
