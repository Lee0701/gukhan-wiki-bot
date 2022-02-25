import { getEnv } from '../../util/Env';
const name = 'TIMESTAMP';
let timestamp:any = getEnv({ name });
if (
	timestamp == '' ||
	typeof timestamp == 'undefined'
) {
	timestamp = Date.now(); // Set to defaults
} else {
	timestamp = Number(timestamp) * 1000; // Convert from POSIX Time
}
export { timestamp };
