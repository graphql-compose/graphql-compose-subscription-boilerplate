# graphql-compose-subscription-boilerplate

## Includes

* Babel (ES6, babel-preset-env)
* ESLint
* Flowtype
* express
* apollo-server-express
* graphql
* graphql-compose
* graphql-subscriptions
* subscriptions-transport-ws
* nodemon

## Usage

```bash
git clone https://github.com/graphql-compose/graphql-compose-subscription-boilerplate

cd graphql-compose-subscription-boilerplate

# make it to your own
rm -rf .git

yarn install

# start server with reloading on file changes
yarn dev

# OR start server
yarn start
```

## How to subscribe

1.  Describe your subscription like below

```js
schemaComposer.Subscription.addFields({
  updatePost: {
    type: 'Post',
    resolve: payload => {
      return payload.updatePost;
    },
    subscribe: () => pubsub.asyncIterator('updatePost'),
  },
});
```

As you noticed, PubSub library is used that will help you.

2.  In your mutation, specify the data that you want to subscribe to.

```js
...
pubsub.publish('updatePost', { updatePost: post });
...
```

Now, when a mutation invokes, Subscription will watch and report changes in the data.

3.  Customize server part like in boilerplate.
    Pay attention, in comparison with the usual server for GraphQL, there is `SubscriptionServer` and `subscriptionsEndpoint`.
