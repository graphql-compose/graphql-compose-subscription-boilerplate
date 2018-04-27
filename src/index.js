/* @flow */
/* eslint-disable no-unused-vars, no-new */

import express from 'express';
import { execute, subscribe } from 'graphql';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { createServer } from 'http';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema } from './schema';

const PORT = 4000;
const app = express();

const pubsub = new PubSub();
const server = createServer(app);

new SubscriptionServer(
  {
    execute,
    subscribe,
    schema,
  },
  {
    server,
    path: '/subscriptions',
  }
);

server.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/graphql`);
});

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`, // subscriptions endpoint.
  })
);
