export function getVersion ({
	version,
	path
}:{
	version: string,
	path: string,
}) {
	return `/${version}/${path}`;
}
