import { BASE_URL } from '../../api'
export const uploadImageFilter = (url) => {
	if (!url) {
		return console.log('uploadImageFilter are empty')
	}
	return url?.replace('/v1', '').replace('/v1/', '').replace('uploads/', '')
}

export const isImageExist = (url) => {
	return url ? uploadImageFilter(`${BASE_URL}/${url[0]}`) : 'https://robohash.org/robert'
}
