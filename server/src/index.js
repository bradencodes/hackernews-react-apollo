const { GraphQLServer } = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            let link = links.filter(link => link.id === args.id)[0]
            if (!link) return link
            link.description = args.description
            link.url = args.url
            return link
        },
        deleteLink: (parent, args) => {
            let link = links.filter(link => link.id === args.id)[0]
            let linkIndex = links.indexOf(link)
            links.splice(linkIndex, 1)
            return link
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on https://localhost:4000`))