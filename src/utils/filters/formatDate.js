/**
 * @description formatDate - format createAt date
 * @example from 2022-04-19T22:59:02.407Z to "Friday, April 4, 2022"
 * @param  {date} currDate - current date api
 */
export const formatDateHandler = (currDate) => {
	if (!currDate) return
	const today = new Date(currDate)
	const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
	const date = today.toLocaleDateString('en-En', options)
	return date
}
