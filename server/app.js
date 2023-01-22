const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();

// Handle graphQL request
app.use("/graphql", graphqlHTTP());



app.listen(4000, () => {
  console.log("Running port 4000")
})