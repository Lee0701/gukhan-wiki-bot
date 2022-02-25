import { getEnv } from '../util/Env';

const name = 'WITH_OUT_TWEET';
export const withOutTweet = Boolean(
	(function (s?:string) {
		const _ = `${s}`.toLowerCase();
		return !!_.includes('rue');
	})(getEnv({ name })) // inputs from workflow_dispatch
);
