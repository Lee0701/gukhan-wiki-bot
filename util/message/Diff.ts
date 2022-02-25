import { exit } from 'process';
import { host, protocol } from '../../secrets/mediawiki';
const oe = Object.entries;
const fe = Object.fromEntries;
export function sortDiff ({
	diff
}: {
	diff: { [x: string]: number }
}) {
	const sorted = (fe(oe(diff).sort((a: any[], b: any[]) => (b[1] - a[1]))));
	if (!oe(sorted).length) {
		console.error('No diffs found.');
		exit(0);
	}
	return sorted;
}

export function totalDiff ({
	diff
}: {
	diff: { [x: string]: number }
}) {
	const sorted = sortDiff({ diff });
	const total = {
		diff: (function () {
			let d = 0;
			oe(sorted).forEach(([, _]: any) => {
				d += Number(_);
			});
			return d;
		})()
	};
	return total;
}

export function topDiff ({
	diff
}: {
	diff: { [x: string]: number }
}) {
	const sorted = sortDiff({ diff });
	const top = {
		title: oe(sorted)[0][0],
		diff: oe(sorted)[0][1],
		url: `${protocol}//${host}/wiki/${oe(sorted)[0][0]}`
	};
	return top;
}

export function diffElements ({
	diff
}: {
	diff: { [x: string]: number }
}) {
	const sorted = sortDiff({ diff });
	const total = totalDiff({ diff });
	const top = topDiff({ diff });
	let t: any = oe(sorted).slice(0, 3);
	t.push(['總計', Number(total.diff)]);
	t = t.map(([t, d]: any, index: number, array: any): any => {
		const tt = `* ${t}`;
		const dd = (
			d > 0
				? ('+' + d)
				: d) + '바이트';
		return `${tt} : ${dd}`;
	}).join('\n');
	const p = `寫眞: ${top.title} ${top.url}`;
	return `${t}\n${p}`;
}
