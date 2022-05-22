module.exports = {
    'facebookAuth' : {
        'clientID'      : 'your-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'     : 'http://localhost:4000/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:4000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '1035098370556-r38itgibmqvv59l867vedj5mfjl01gua.apps.googleusercontent.com',
        'clientSecret'     : '-l0LTC9vBf6VhOHC19_DQIbQ',
        'callbackURL'      : 'http://localhost:8000/api/register/google/callback'
    }
};