export function formatKey(key: string): string {
	let words: string[] = key.split(/(?=[A-Z])/) // This splits the string into words at each uppercase letter.
	return words
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ')
}
