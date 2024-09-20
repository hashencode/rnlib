import Router from './src/route/Router';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/lib/store';
import LibProvider from './src/lib/providers/LibProvider';

function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <LibProvider>
                    <Router />
                </LibProvider>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
