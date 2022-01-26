export const uploadImageFilter = (url) => {
	if (!url) {
		return console.log('uploadImageFilter are empty')
	}
	return url?.replace('/v1', '').replace('/v1/', '').replace('uploads/', '')
}
