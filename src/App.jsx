import Router from "./shared/Router";
import "./styles/reset.css";
import { Amplify } from 'aws-amplify';
import config from './aws-exports.js';

Amplify.configure(config);
function App() {
  return (
    <Router />
  );
}

export default App;