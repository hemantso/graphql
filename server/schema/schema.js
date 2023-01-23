const graphql = require('graphql');
const _ = require("lodash")
const { GraphQLObjectType, GraphQLString } = graphql;


const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLString},
    name: {type: GraphQLString},
    genre: { type: GraphQLString}
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
    }
  }
});

module.export = new graphql.GraphQLSchema({
  query: RootQuery
});


