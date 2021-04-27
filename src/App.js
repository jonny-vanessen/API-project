import './App.css';
import Trump from './Trump'
import Conversation from './Conversation/Conversation'

function App() {
  return (
    <div className="App flex-col align-center">
      <Conversation />
      <Trump />
    </div>
  );
}

export default App;
