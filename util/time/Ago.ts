export const millisecond: number = (1);
export const second: number = (1000 * millisecond);
export const minute: number = (60 * second);
export const hour:number = (60 * minute);

export function getHoursAgo ({
	timestamp,
	hours
}:{
	timestamp: number,
	hours: number
}): number {
	return (timestamp - (hours * hour));
}
