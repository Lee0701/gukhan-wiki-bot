import { getEnvRequired } from '../../util/Env';
const name:string = 'MEDIAWIKI_HOST';
export const host:string = getEnvRequired({ name });
