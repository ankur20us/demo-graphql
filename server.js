const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const app = express()
const port = 4040

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.get('/', (req, res) => {
  res.send("<html><a href='graphql'> Please go to this. </a></html>")
})

app.listen(port, () => {
  console.log(`🚀  Server ready at ${port}`)
})
