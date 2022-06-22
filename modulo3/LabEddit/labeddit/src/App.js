import Router from "./routes/Router";
import GlobalState from "./global/GlobalState";
import './App.css';

function App() {
  return (
    <GlobalState>
      <Router />
    </GlobalState>
  );
}

export default App;