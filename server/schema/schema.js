const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList } = require('graphql')
const _ = require('lodash')


const movies = [
    {
        id: "1",
        title: 'title 1',
        description: 'description 1',
        year: 1993,
        directorId: "1"
    },
    {
        id: "2",
        title: 'title 2',
        description: 'description 2',
        year: 1993,
        directorId: "2"
    },
    {
        id: "3",
        title: 'title 3',
        description: 'description 3',
        year: 1993,
        directorId: "2"
    },
    {
        id: "4",
        title: 'title 4',
        description: 'description 4',
        year: 1993,
        directorId: "3"
    },
    {
        id: "5",
        title: 'title 5',
        description: 'description 5',
        year: 1996,
        directorId: "3"
    }
]


const directors = [
    {
        id: "1",
        name: "John Doe",
        birth: 1990
    },
    {
        id: "2",
        name: "Can Yetmez",
        birth: 1980
    },
    {
        id: "3",
        name: "Json Stathom",
        birth: 1960
    },
]
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        year: { type: GraphQLInt },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(directors, { id: parent.directorId })
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        birth: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return _.filter(movies, { directorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return _.find(movies, { id: args.id })
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return _.find(directors, { id: args.id })
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies;
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return directors;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})