import React from 'react'
import { Paragraph, Link, useTheme } from 'react-native-paper'

export default function TextCustom(props) {
	const { colors } = useTheme()
	return (
		<Paragraph style={{ textAlign: 'center', color: colors.primary }} {...props}>
			{props.children}
		</Paragraph>
	)
}
