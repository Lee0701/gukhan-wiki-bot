import { getEnvRequired } from '../../util/Env';

export const secrets = {
	key: getEnvRequired({ name: 'GOOGLE_PAGESPEED_API_KEY' })
};
