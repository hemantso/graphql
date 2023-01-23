const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();


mongoose.connect("url");
mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
})
// Handle graphQL request
app.use("/graphql", graphqlHTTP({
  schema,
  // to use the tool
  graphiql: true
}));



app.listen(4000, () => {
  console.log("Running port 4000")
})