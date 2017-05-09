'use strict'

module.exports = {
  db:  (process.env.MONGODB_URI || 'mongodb://localhost/mean-dev'),
  /**
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
  dbOptions: {
    /*
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    },
    replset: {
      rs_name: 'myReplicaSet',
      poolSize: 5
    },
    db: {
      w: 1,
      numberOfRetries: 2
    }
    */
  },
  hostname: 'https://hackath.org',
  app: {
    name: 'Hackathorg - The Hackathon organiser tool'
  },
  logging: {
    format: 'combined'
  },
  strategies: {
    local: {
      enabled: true
    },
    landingPage: '/',
   facebook: {
      clientID: process.env.facebook_client_id,
      clientSecret: process.env.facebook_client_secret,
      callbackURL: 'https://hackath.org/api/auth/facebook/callback',
      enabled: true
    },
    twitter: {
      clientID: 'DEFAULT_CONSUMER_KEY',
      clientSecret: 'CONSUMER_SECRET',
      callbackURL: 'https://hackath.org/api/auth/twitter/callback',
      enabled: false
    },
    github: {
      clientID: 'DEFAULT_APP_ID',
      clientSecret: 'APP_SECRET',
      callbackURL: 'https://hackath.org/api/auth/github/callback',
      enabled: false
    },
    google: {
      clientID: process.env.google_client_id,
      clientSecret: process.env.google_client_secret,
      callbackURL: 'https://hackath.org/api/auth/google/callback',
      enabled: true
    },
    linkedin: {
      clientID: 'DEFAULT_API_KEY',
      clientSecret: 'SECRET_KEY',
      callbackURL: 'http://localhost:3000/api/auth/linkedin/callback',
      enabled: false
    },
    heroku: {
      clientID: process.env.heroku_client_id,
      clientSecret: process.env.heroku_client_secret,
      callbackURL: 'https://hackath.org/api/auth/heroku/callback',
      enabled:true

    }
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  },
  secret: 'SOME_TOKEN_SECRET'
};
