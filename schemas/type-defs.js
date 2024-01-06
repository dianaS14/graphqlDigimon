const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  scalar Cursor

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    showing:Int!
    total:Int!
    after:Cursor
  }


  type CharacterConnection {
    edges: [CharacterEdge!]!
    pageInfo: PageInfo!
  }

type CharacterEdge {
  node: Character!
  cursor: String!
}


  type Character {
   name: String!
   level: String!
   img: String
    }

  type Query {

    characters(first: Int!, after: Cursor): CharacterConnection!
    charactersByFilter(name: String , level:String): [Character!] 
    levels: [String]
     }




`;

module.exports = { typeDefs };
