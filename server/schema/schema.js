const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = require('graphql')
const _ = require('lodash')


const movies = [
    {
        id: "1",
        title: 'title 1',
        description:  'description 1',
        year: 1993
    },
    {
        id: "2",
        title: 'title 2',
        description:  'description 2',
        year: 1993
    },
    {
        id: "3",
        title: 'title 3',
        description:  'description 3',
        year: 1993
    },
    {
        id: "4",
        title: 'title 4',
        description:  'description 4',
        year: 1993
    }
]
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args) => {
                return _.find(movies,{ id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})