import { client } from './Client';
import { protocol } from './Protocol';
import { upload as host } from './Host';
import { getVersion } from './Version';

const	path = getVersion({
	version: '1.1',
	path: 'media/upload.json'
});
const url = `${protocol}//${host}${path}`;

export async function uploadMedia ({
	category, // : 'tweet_image',
	media // : 'base64; ...',
}:{
	category: string,
	media: string
}) {
	const res = await client.post(url, {
		media_category: category,
		media_data: media
	});
	const mediaId:string = res.media_id_string;
	return mediaId;
}
