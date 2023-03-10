const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');
const _ = require("lodash");
const { findById } = require('../models/book');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLID, GraphQLInt } = graphql;


const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLID},
    name: {type: GraphQLString},
    genre: { type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent,args) {
        // return _.find(authors,{ id: parent.authorId});
        return Author.findById(parent.authorId)
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
        // return _.filter(books, {authorId: parent.id});
        return Book.find({authorId: parent.id});
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
        // return _.find(books, {id: args.id});
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      },
    },
    Author: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

//Type Relation
//Mutation in GraphQl -> CRUD opertion on data

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLID}
      },
      resolve(parent, args){
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
})

module.export = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});


