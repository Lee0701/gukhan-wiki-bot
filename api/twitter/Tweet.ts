import { client } from './Client';
import { protocol } from './Protocol';
import { api as host } from './Host';
import { getVersion } from './Version';
const path = getVersion({
	version: '1.1',
	path: 'statuses/update.json'
});
const url = `${protocol}//${host}${path}`;
export async function updateTweet ({
	mediaIds,
	text
}: {
	mediaIds?: string[],
	text: string
}) {
	const res = await client.post(url, {
		media_ids: mediaIds ? mediaIds.join(',') : undefined,
		status: text
	});
	return res;
}
