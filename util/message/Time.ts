import { hours, timestamp } from '../../inputs/mediawiki';
import { formatDate } from '../date/Format';
import { getEnv } from '../Env';
import { formatTime } from '../time/Format';
export function timeTill () {
	const f = { d: formatDate, t: formatTime };
	return (
		getEnv({ name: 'TIMESTAMP' })
			? `${f.d({ timestamp })}${f.t({ timestamp })}以前`
			: '最近'
	);
}
export function timeDuring () {
	return `${timeTill()} ${hours}時間동안의 編輯現況입니다.\n`;
}
