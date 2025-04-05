import { __prod__, PORT, Front_URL } from './constants';
// import { __prod__, COOKIE_NAME, SESSION_SECRET, PORT, URL } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { typeormConfig } from './typeormConfig';
import cors from 'cors';
import { AppealsResolver } from './resolvers/appeals';

// Start graphql server
const main = async () => {
    const connect_typeorm = typeormConfig;
    connect_typeorm.initialize()
        .then(() => console.log('Data load - success'))
        .catch((e: any) => console.error(e))

    const app = express();
  
    app.use(
        cors({
          origin: Front_URL,
          credentials: true,
        })
      );
    
      const apolloServer = new ApolloServer({
        schema: await buildSchema({
          resolvers: [AppealsResolver],
          validate: false,
        }),
        context: ({req, res}) => ({ req, res })
      });
    
      await apolloServer.start();
      apolloServer.applyMiddleware({
        app,
        cors: false
      });
    
      app.listen(PORT, () => {
        console.log('Server started at http://localhost:4000');
      });
    
}

main().catch((err) => {
    console.error(err)
  });
  