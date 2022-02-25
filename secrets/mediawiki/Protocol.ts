import { getEnvRequired } from '../../util/Env';
const name = 'MEDIAWIKI_PROTOCOL';
let protocol:string = getEnvRequired({ name });
if (!protocol.endsWith(':')) {
	protocol += ':';
}
if (protocol.startsWith(':')) {
	throw Error('MEDIAWIKI_PROTOCOL is not valid');
}
export { protocol };
