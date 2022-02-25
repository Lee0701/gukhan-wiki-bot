import { getEnv } from '../../util/Env';
const name = 'MEDIAWIKI_API_ENDPOINT';
export const api = getEnv({ name }) ?? '/api.php';
