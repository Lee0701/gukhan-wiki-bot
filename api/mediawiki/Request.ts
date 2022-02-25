import { request } from '@corcc/request';
import { stringify as qs } from 'querystring';
import {
	protocol,
	host,
	api as path,
	userAgent
} from '../../secrets/mediawiki';

const oe = Object.entries;
const js = JSON.stringify;
const jp = JSON.parse;
export class GETRequest {
	userAgent: string = userAgent;
	response: any;

	protocol: string = protocol;
	host: string = host;
	path: string = path;
	getRequestBody () { return {}; }
	getRequestQuery () { return {}; }
	body: any;
	json: any;
	async request () {
		const q: any = this.getRequestQuery();
		let b: any = this.getRequestBody();
		b = oe(b).length ? js(b) : '';
		const o: any = {
			protocol: this.protocol,
			method: 'GET',
			host: this.host,
			headers: { 'User-Agent': this.userAgent },
			path: `${this.path}?${qs(q)}`,
			body: b || undefined
		};
		this.response = await request(o);
		if (this.response.body) {
			const b = this.body = this.response.body;
			if (
				this.response.headers['content-type'] &&
				this.response.headers['content-type'].includes('json')
			) { this.json = jp(b); };
		}
	}
}
