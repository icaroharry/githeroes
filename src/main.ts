import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';

import { environment } from './environment';
import resolvers from './resolvers';
import typeDefs from './type-defs';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: environment.apollo.introspection,
  playground: environment.apollo.playground
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: environment.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${environment.port}${server.graphqlPath}`),
);

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
