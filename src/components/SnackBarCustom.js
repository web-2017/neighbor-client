import React from 'react'
import { Snackbar, useTheme } from 'react-native-paper'

export default function SnackBarCustom({ visible = false, message = '', setVisible, error }) {
	const { colors } = useTheme()
	return (
		<Snackbar
			style={{ backgroundColor: error ? colors.alert : colors.green }}
			visible={visible}
			onDismiss={() => {}}
			action={{
				label: 'close',
				onPress: () => {
					setVisible(!visible)
				},
			}}>
			{message}
		</Snackbar>
	)
}
