import { getEnvRequired } from '../util/Env';

export const secrets = {
	consumer_key: getEnvRequired({ name: 'TWITTER_CONSUMER_KEY' }),
	consumer_secret: getEnvRequired({ name: 'TWITTER_CONSUMER_SECRET' }),
	access_token_key: getEnvRequired({ name: 'TWITTER_ACCESS_TOKEN_KEY' }),
	access_token_secret: getEnvRequired({ name: 'TWITTER_ACCESS_TOKEN_SECRET' })
};
