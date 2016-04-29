module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/loginapp'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
