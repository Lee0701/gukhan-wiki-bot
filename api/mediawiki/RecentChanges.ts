import { GETRequest } from './Request';
import { getHoursAgo } from '../../util/time/Ago';
import { hours, timestamp } from '../../inputs/mediawiki';
import { rclimit } from '../../secrets/mediawiki';
const oe = Object.entries;
const fe = Object.fromEntries;
export class RecentChanges extends GETRequest {
	timestamp: number = timestamp; // Default: Date.now()
	readonly format: string = 'json';
	readonly action: string = 'query';
	readonly list: string = 'recentchanges';
	readonly rcprop: string = 'title|sizes|tags';
	rclimit: number = rclimit; // Default: 20
	rcnamespace: string = '0';
	rccontinue: any = null;
	rcstart: number = this.timestamp;
	rcend: number = getHoursAgo({
		timestamp: this.timestamp,
		hours // Default: 1
	});

	diff: any = {};

	excludeTags: any = ['mw-new-redirect'];

	recentchanges: any = [];

	agoHours: any;

	constructor () {
		super();
	}

	getRequestQuery (): {
		[x: string]: any
		} {
		return fe(oe({
			format: this.format,
			action: this.action,
			list: this.list,
			rcprop: this.rcprop,
			rcstart: new Date(this.rcstart).toISOString(),
			rcend: new Date(this.rcend).toISOString(),
			rclimit: this.rclimit,
			rcnamespace: this.rcnamespace,
			rccontinue: this.rccontinue
		}).filter(([, _]: any): any => (_ || undefined)));
	}

	async resolve () {
		await this.request();
		const rccontinue = this.rccontinue = (function (_: any) {
			return _ ? _.rccontinue : _;
		})(this.json.continue);
		this.json.query.recentchanges.forEach((rc: any): any => {
			if (
				rc.tags &&
				rc.tags.filter((_: any): any => {
					return this.excludeTags.includes(_);
				}).length
			) {
				return;
			}
			this.recentchanges.push(rc);
		});
		if (rccontinue) {
			await this.resolve();
		}
		this.diffLengths();
	}

	diffLengths () {
		this.recentchanges.forEach(({
			title,
			oldlen,
			newlen
		}: {
			title: string,
			oldlen: number,
			newlen: number
		}) => {
			const lengthDiff = newlen - oldlen;
			if (!this.diff[title]) {
				this.diff[title] = lengthDiff;
			} else {
				this.diff[title] += lengthDiff;
			}
		});
	}

	setStart ({ time }: { time: number }) {
		this.rcstart = time;
	}

	setEnd ({ time }: { time: number }) {
		this.rcend = time;
	}
}
