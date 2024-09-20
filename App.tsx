import 'react-native-gesture-handler';
import Router from './src/route/Router';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import LibProviders from './src/lib/providers';
import store from './src/lib/store';

function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <LibProviders>
                    <Router />
                </LibProviders>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
