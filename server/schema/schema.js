const graphql = require('graphql');
const _ = require("lodash")
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;


const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    genre: { type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    age: { type: GraphQLInt }
  })
});

//Requeries

const RootQuery = new GraphQLSObjectType({
  name:'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args:{ id: {type: GraphQLString}},
      resolve(parent, args) {
        // code to get data from db 
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(authors, {id: args.id});
      }
    }
  }
});

module.export = new graphql.GraphQLSchema({
  query: RootQuery
});


