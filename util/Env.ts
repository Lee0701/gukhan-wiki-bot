import * as core from '@actions/core';

export function getEnv ({
	name
}:{
	name:string;
}) {
	let e:any = core.getInput(name);
	if (!e) {
		e = process.env[name];
	}
	return e;
}

export function getEnvRequired ({
	name
}:{
	name:string
}): string {
	const e: any = getEnv({ name });
	if (!e) {
		throw new Error(`${name} was not set`);
	}
	return `${e}`;
}
