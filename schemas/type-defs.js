const { gql } = require("apollo-server-express");

const typeDefs = gql`
  


  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    showing:Int!
    total:Int!
    after:String
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

    characters(first: Int!, after: String): CharacterConnection!
    charactersByFilter(name: String , level:String): [Character!] 
    levels: [String]
     }




`;

module.exports = { typeDefs };
