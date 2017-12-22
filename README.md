# OpenSupport

Discover who is maintaining the dependencies you use, and give back.

Visit [OpenSupport.me](https://opensupport.me) to give it a try.

OpenSupport scans your project's package.json for dependencies (and their dependencies) to
find out which maintainers' packages are used the most.

---

## Planned features

- composer.json support
- scan GitHub account
- show most packages used as result
- donate links for maintainers (eg. Patreon)
- donate links for packages

## Issues and ideas

Please create issues on GitHub when you run into an issue or have an idea for improvement.

## Development

### Installation

Requirements: Node.js

```
npm install
```

You need an environment variable called `DATABASE_URL` which connects to your database. [Read the
getting started docs of Sequelize](http://docs.sequelizejs.com/manual/installation/getting-started.html)
to see how such connection string is made.

Add your database engine by executing one of the following (mysql2 is installed by default):

```
$ npm install pg@6 pg-hstore #pg@7 is currently not supported
$ npm install mysql2
$ npm install sqlite3
$ npm install tedious // MSSQL
```

### Running the service:

The following command will sync the database tables and run the application.

```
npm run sync && npm run start
```

### Running the client

The following command will start `webpack-dev-server`

```
npm run start:dev
```
