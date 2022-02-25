import { RecentChanges } from '../api/mediawiki/RecentChanges';
import { updateTweet } from '../api/twitter/Tweet';
import { uploadMedia } from '../api/twitter/Media';
import { PageSpeed } from '../api/google/pagespeed/Run';
import { withOutTweet } from '../inputs/Twitter';
import { hours } from '../inputs/mediawiki/Ago';
import { exit } from 'process';
import { timeDuring } from '../util/message/Time';
import { diffElements, topDiff } from '../util/message/Diff';
const oe = Object.entries;
const rc = new RecentChanges();
const ps = new PageSpeed({});
console.debug(`$TZ: ${process.env.TZ}`);
console.debug(`$TIMESTAMP: ${process.env.TIMESTAMP}`);
console.debug(`$WITH_OUT_TWEET: ${withOutTweet}`);
console.debug(`$WITH_OUT_TWEET: ${process.env.WITH_OUT_TWEET}`);
console.debug(`$HOURS_AGO: ${hours}`);
console.debug(`$RCSTART: ${new Date(rc.rcstart)} (${rc.rcstart})`);
console.debug(`$RCEND: ${new Date(rc.rcend)} (${rc.rcend})`);
let
	text = '';
const mediaIds: any[] = [];
(async function () {
	await rc.request();
	await rc.resolve();
	text = `${timeDuring()}${diffElements({ diff: rc.diff })}`;
	console.info(text);
	await ps.run({
		url: topDiff({ diff: rc.diff }).url
	});
	if (
		Math.floor(
			ps.response.statusCode / 100
		) != 2
	) {
		console.error(ps.response.statusCode);
		console.error(ps.json);
		throw Error('Failed to run PageSpeed Insight');
	}
	if (
		oe(rc.diff).length &&
		!withOutTweet && // Check workflow_dispatch input
		`${ps.response.statusCode}`[0] == '2'
	) {
		const s: any = ps.getScreenShot(); // Get ScreenShot from PageSpeed Response
		const mediaId: any = await uploadMedia({ // Upload to Twitter
			category: 'tweet_image',
			media: s.replaceAll('_', '/')
				.replaceAll('-', '+')
				.replace('data:image/jpeg;base64,', '')
			// Fix incorrect base64
			// https://stackoverflow.com/questions/32519893/replace-isnt-working-on-incorrect-base64
		});
		mediaIds.push(mediaId);
	} else {
		console.info(ps.response.statusCode);
		console.warn('Skipping Upload Media to Twitter');
	}
	if (
		oe(rc.diff).length &&
		!withOutTweet && // Check workflow_dispatch input
		mediaIds.length &&
		text
	) {
		const res = await updateTweet({ mediaIds, text });
		console.info(res);
	} else {
		console.warn('Skipping Update Tweet to Twitter');
	}
})().catch((e: any) => {
	console.error(e);
	exit(-1);
});
