import { getEnv } from '../../util/Env';
const name = 'HOURS_AGO';
let hours:any = getEnv({ name });
if (
	hours == '' ||
	typeof hours == 'undefined'
) {
	hours = 1; // Set to defaults
} else {
	hours = Number(hours);
}
export { hours };
