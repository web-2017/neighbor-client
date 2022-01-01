import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'

import { theme } from './src/config/theme'
import BottomTabNavigation from './src/navigation'

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<StatusBar style='auto' />
			<BottomTabNavigation />
		</PaperProvider>
	)
}
