import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'

import { UserProvider } from './src/store/context'
import { theme } from './src/config/theme'
import BottomTabNavigation from './src/navigation'

export default function App() {
	return (
		<UserProvider>
			<PaperProvider theme={theme}>
				<StatusBar style='auto' />
				<BottomTabNavigation />
			</PaperProvider>
		</UserProvider>
	)
}
