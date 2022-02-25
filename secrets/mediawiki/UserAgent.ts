import { host, protocol } from '.';
import { getEnv } from '../../util/Env';
const name = 'MEDIAWIKI_USER_AGENT';
export const userAgent = getEnv({ name }) ||
	`Mozilla/5.0 (Linux x86_64; MediaWikiBot/2.0; +${protocol}//${host})`;
