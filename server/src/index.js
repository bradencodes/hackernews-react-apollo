const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query.js')
const Mutation = require('./resolvers/Mutation.js')
const User = require('./resolvers/User.js')
const Link = require('./resolvers/Link.js')
const Subscription = require('./resolvers/Subscription')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    },
})
server.start(() => console.log(`Server is running on https://localhost:4000`))