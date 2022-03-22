import useAuthenticate from './authentication/useAuthenticate';
import Home from './routes/Home';
import './styles/styles.css';

function App() {
  const auth = useAuthenticate();
  auth();
  return (
    <Home/>
  );
}

export default App;
