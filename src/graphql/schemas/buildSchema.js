const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}
type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdEVents: [Event!]
}

type AuthData {
    token: String!
}

input UserInput {
  email: String!
  password: String!
}

input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): String 
}

type RootMutation{
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(event: ID!): Booking
    cancelBooking(bookingId: ID!): Event
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);
