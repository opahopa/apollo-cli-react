import ApolloClient from "apollo-boost";
// import { defaults, resolvers } from "./resolvers";


//https://www.apollographql.com/docs/react/advanced/boost-migration.html - the only valid doc source (12.2018)
const Client = new ApolloClient({
    uri: `https://server-4gyt0mem7.now.sh`,
    clientState: {
        defaults: {
            username: '*default*'
        }
    }
});

export {Client};