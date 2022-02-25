export function formatTime ({
	timestamp
}:{
	timestamp: number
}) {
	const D = new Date(timestamp);
	const h = D.getHours();
	const m = D.getMinutes();
	const s = D.getSeconds();
	return `${h}時${m}分${s}秒`;
}
