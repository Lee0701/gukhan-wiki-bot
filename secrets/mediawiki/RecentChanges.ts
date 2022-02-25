import { getEnv } from '../../util/Env';
let rclimit:any = getEnv({
	name: 'MEDIAWIKI_RECENT_CHANGES_RCLIMIT'
});

if (!rclimit) {
	rclimit = 20; // Set to defaults
} else {
	rclimit = Number(rclimit);
}
export { rclimit };
