import Router from './dev/route/Router';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store';
import LibProvider from './src/providers/LibProvider';

import 'react-native-svg';

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
