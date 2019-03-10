const graphql = require('graphql')
const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

const CompanyType = new GraphQLObjectType({
  name: 'CompanyType',
  description: 'Company Data',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (parentValue, args) => {
        return parentValue.id
      }
    },
    name: {
      type: GraphQLString,
      resolve: (parentValue, args) => {
        return parentValue.name
      }
    },
    description: {
      type: GraphQLString,
      resolve: (parentValue, args) => {
        return parentValue.description
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: ({ id }, args) => {
        return axios.get(`http://localhost:3004/companies/${id}/users`)
          .then(({ data }) => data)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'User Data',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (parentValue, args) => {
        return parentValue.id
      }
    },
    firstName: {
      type: GraphQLString,
      resolve: (parentValue, args) => {
        return parentValue.firstName
      }
    },
    age: {
      type: GraphQLInt,
      resolve: (parentValue, args) => {
        return parentValue.age
      }
    },
    company: {
      type: CompanyType,
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3004/companies/${parentValue.companyId}`)
          .then(({ data }) => data)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, { id }) => {
        return axios.get(`http://localhost:3004/users/${id}`)
          .then(({ data }) => data)
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: (parentValue, { id }) => {
        return axios.get(`http://localhost:3004/companies/${id}`)
          .then(({ data }) => data)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { },
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3004/users/`)
          .then(({ data }) => data)
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      args: { },
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3004/companies/`)
          .then(({ data }) => data)
      }
    }
  })
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root mutation',
  fields: () => ({
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parentValue, { firstName, age, companyId }) => {
        return axios.post(`http://localhost:3004/users/`, { firstName, age, companyId })
          .then(res => res.data)
      }
    }

  })
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
