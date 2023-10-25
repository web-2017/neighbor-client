/**
 * @description formatDate - format createAt date
 * @example from 2022-04-19T22:59:02.407Z to "Friday, April 4, 2022"
 * @param  {date} currDate - current date api
 */
export const formatDateHandler = (currDate) => {
	if (!currDate) return
	const today = new Date(currDate)
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}
	const date = today.toLocaleDateString('en-En', options)
	return date
}

export const calculateDaysAgo = (date) => {
	const createdDate = new Date(date)
	const currentDate = new Date()

	const timeDifference = currentDate - createdDate
	const millisecondsPerDay = 1000 * 60 * 60 * 24

	const totalDays = Math.floor(timeDifference / millisecondsPerDay)
	const totalYears = Math.floor(totalDays / 365)
	const remainingDays = totalDays % 365

	const totalMonths = Math.floor(remainingDays / 30)
	const remainingDaysInMonth = remainingDays % 30

	const result = []

	if (totalYears > 0) {
		result.push(`${totalYears} year`)
	}

	if (totalMonths > 0) {
		result.push(`${totalMonths} month`)
	}

	if (remainingDaysInMonth > 0) {
		result.push(`${remainingDaysInMonth} days`)
	}

	return result.join(', ')
}
