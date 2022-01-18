export const uploadImageFilter = (url) => {
	if (!url) return console.log('uploadImageFilter are empty', uploadImageFilter)
	return url?.replace('/v1', '').replace('/uploads', '')
}
