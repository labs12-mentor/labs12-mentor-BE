require('dotenv').config();

const localPgConnection = {
  host: process.env.DB_HOST,
  database:  process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: 'pg',
    connection: prodDbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: prodDbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },
  
  production: {
    client: 'pg',
    connection: prodDbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }
};