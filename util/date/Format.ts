export function formatDate ({
	timestamp
}:{
	timestamp: number
}): string {
	const D = new Date(timestamp);
	const y:number = D.getFullYear();
	const m:number = D.getMonth() + 1;
	const d:number = D.getDate();
	return `${y}年${m}月${d}日`;
}
