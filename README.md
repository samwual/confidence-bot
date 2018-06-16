# confidence-bot
twitter bot made to help you feel good

Things required to run this:

`npm install twit --save`

You also need a developer twitter acount to generate the API keys - 
Then, create a new file `config.js` and enter this code in:
`
module.exports = {
	consumer_key:         'CONSUMER_KEY',
 	consumer_secret:      'CONSUMER_SECRET',
  access_token:         'ACCESS_TOKEN',
  access_token_secret:  'ACCESS_TOKEN_SECRET',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
}
`
