/**
 * @description sliceStringFilter = slice any string on length
 * @param  {String} str='any string'
 * @param  {number} strLength=30 set number of length string
 */
export const sliceStringFilter = (str = '', strLength = 30) =>
	str.length < 15 ? str.slice(0, strLength) : str.slice(0, strLength) + '...'
