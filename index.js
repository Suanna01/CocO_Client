import { AppRegistry } from 'react-native';
import App from './App'; // App.js를 import
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
