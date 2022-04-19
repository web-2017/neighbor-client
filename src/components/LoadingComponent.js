import * as React from 'react'
import { ActivityIndicator, Colors, useTheme } from 'react-native-paper'
const { colors } = useTheme()

export const LoadingComponent = () => <ActivityIndicator animating={true} color={colors.green} />
