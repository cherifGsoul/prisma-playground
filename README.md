## Installation
```shell
$ npm i prisma --save-dev
```

## Initialization:
```shell
$ npx prisma init
```

## Configure .env file
I'm using just sqlite.

## Editing Prisma Schema
After editing `schema.prisma` a Prisma can be generated

```shell
$ npx prisma generate
```

## For existing project
To import existing DB to Prisma

```shell
$ npx prisma db pull
```

## What I like:
- Schema is decoupled form the model
- The query and commanding DSL
- Easy to setup
- The migration system
- Responsible for data only
- Works with, PostgreSQL, MySQL (maybe MariaDB), SQLite, MongoDB and SQLServer are not stable yet
- Possibility to map column to custom properties name
- Good documentation

## What I don't like:

- Lack of a DBAL (DB Abstraction layer)

## What is "special" about it:

- The flexibilty around the DSL
- Can be integratd with lot of frameworks
- Can be integratd with any type of architecture



