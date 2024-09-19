import 'react-native-gesture-handler';
import Router from './src/route/Router';
import UIProviders from '@/lib/providers';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from '@/lib/store';

function App() {
    return (
        <Provider store={store}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <UIProviders>
                    <Router />
                </UIProviders>
            </SafeAreaProvider>
        </Provider>
    );
}

export default App;
