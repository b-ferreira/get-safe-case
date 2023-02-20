# Setup

In order to setup the project and run it locally in dev mode execute the following commands in the root folder of the project:

```shell
# install the dependencies
yarn

# start the app in dev mode on localhost:3000
yarn start:dev

# For testing:
yarn test

# For linting:
yarn lint
```

# Main changes

#### Replaced CRA with NextJS

The goal with this change was to stablish the foundation of a production-ready code base.  
NextJS has an easy and incremental migration, and by using it we have many features for a more scalable and reliable project out of the box.

#### Updated quality aspects of the project

Some of the configurations for linting, testing, and type-checking was missing in the project.  
Support for ESLint and Jest was added, and the Typescript configuration was improved.

#### Usage of Zod for schema validation

One of the aspects of the project was that every "Flow Step" should be validated before allowing the user to proceed.
Zod was added in order to facilidate this job, and also to help with the definition of the steps types through the schemas for each step.

#### Refactored BuyFlow and Steps components

The logic of BuyFlow was coupled to its rendering function. Now the component works with a type-safe array of steps and implements a custom rendering logic for each step.  
The data aggregation is still similar, however now it's easier to just define what steps a flow will operate with using a single prop.

#### Added unit tests

Unit tests was added for most of the components and also for the form validation hook.
