const graphql = require('graphql');
const _ = require("lodash")
const { GraphQLObjectType,GraphQLList, GraphQLString, GraphQLID, GraphQLInt } = graphql;


const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    genre: { type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent,args) {
        return _.find(authors,{ id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id});
      }
    }
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

//Type Relation



module.export = new graphql.GraphQLSchema({
  query: RootQuery
});


