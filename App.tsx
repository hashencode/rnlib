import Router from './dev/route/Router';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import LibProvider from './src/providers/LibProvider';

function App() {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <LibProvider>
                <Router />
            </LibProvider>
        </SafeAreaProvider>
    );
}

export default App;
