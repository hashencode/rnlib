import 'react-native-gesture-handler';
import Router from './src/route/Router';
import UIProviders from '@/lib/providers';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <UIProviders>
          <Router />
        </UIProviders>
      </SafeAreaProvider>
  );
}

export default App;
