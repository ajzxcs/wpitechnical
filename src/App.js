import Routess from './Router/Routes'
import Drift from "react-driftjs";
function App() {
  return (
    <div className="App">
      <Routess/>

      {/* chat bot */}
      <Drift appId={process.env.REACT_APP_CHAT_BOT}/>
    </div>
  );
}

export default App;
