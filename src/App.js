import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes';

import Homepage from './pages/Login/components/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Homepage />;
      </Router>
    </BrowserRouter>
  );
}

export default App;
