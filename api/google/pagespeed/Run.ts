import { protocol } from './Protocol';
import { api as host } from './Host';
import { getVersion } from './Version';
import { request } from '@corcc/request';
import { stringify as qs } from 'querystring';
import { secrets } from '../../../secrets/google/PageSpeed';
const jp = JSON.parse;
const path = `/pagespeedonline/${getVersion({
	version: 'v5',
	path: 'runPagespeed'
})}`;
export class PageSpeed {
	readonly defaultOptions = {
		protocol,
		host,
		path,
		method: 'GET'
	};

	options:any = this.defaultOptions;
	response:any;
	body:any;
	json:any;
	url:string = '';
	setUrl ({
		url
	}:{
		url?:string
	}) {
		if (url) {
			this.url = url;
			this.options.path = `${
				this.defaultOptions.path}?${qs({
				key: secrets.key,
				url: this.url
			})}`;
		}
	}

	constructor ({
		url
	}:{
		url?: string
	}) {
		this.options = this.defaultOptions;
		this.setUrl({ url });
	}

	async run ({
		url
	}:{
		url?: string
	}) {
		this.setUrl({ url });
		this.response = await request(this.options);
		this.body = this.response.body;
		this.json = jp(this.body);
	}

	getScreenShot (): string {
		const { lighthouseResult }:any = this.json;
		const { audits }:any = lighthouseResult;
		const fullPageScreenshot:any = audits['full-page-screenshot'];
		const { details }:any = fullPageScreenshot;
		const { screenshot }:any = details;
		const { data }:any = screenshot;
		return `${data}`;
	}
}
