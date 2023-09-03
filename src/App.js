import Drift from "react-driftjs";
import Routess from "./Routers/Routess";
const App = () => {
  return (
    <div>
      <Routess/>

      <Drift
      appId={process.env.REACT_APP_CHAT_BOT}
      style={{
        bottom: "100px",
      }}
      />

      {/* hello friend */}
    </div>
  );
};

export default App;
