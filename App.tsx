import Router from './dev/route/Router';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/providers/ThemeProvider';

function App() {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ThemeProvider>
                <Router />
            </ThemeProvider>
        </SafeAreaProvider>
    );
}

export default App;
