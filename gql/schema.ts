export const typeDefs = `#graphql
    type Usuario {
        id: ID!
        nombre: String!
        correo: String!
        coleccion: Coleccion!
    }
    type Comic {
        id: ID!
        titulo: String!
        descripcion: String!
        formato: String!
    }
    type Coleccion {
        id: ID!
        nombre: String!
        comics: [Comic!]!
    }
    type Query {
        getusuario(id:ID!): Usuario!
        getallusuarios: [Usuario!]!
        getcomic(id:ID!): Comic!
        getallcomics: [Comic!]!
    }
    type Mutation {
        addUsuario(nombre: String!, correo: String!): Usuario!
        updateUsuario(id:ID!, nombre: String!, correo: String!): Usuario!
        deleteUsuario(id:ID!): Usuario!
        addComic(titulo: String!, descripcion: String!, formato: String!, coleccion:ID!): Comic!
        updateComic(id:ID!, titulo: String!, descripcion: String!, formato: String!, coleccion:ID!): Comic!
        deleteComic(id:ID!): Comic!
    }
`;
