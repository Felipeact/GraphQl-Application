import "reflect-metadata"

import path from 'path'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import prisma from "./src/prisma/prismaService"
import { UserResolver } from "./src/http/graphql/resolvers/UserResolver"



async function main(){
  const schema = await buildSchema({
    resolvers: [ 
      UserResolver,
    ],
    
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  }) 

  const server = new ApolloServer({
    schema,
  })

  const { url } = await server.listen(4000)
  console.log(`server running at ${url}`)
}


main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })