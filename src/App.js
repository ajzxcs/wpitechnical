import Drift from "react-driftjs";
import Routess from "./Routers/Routess";
const App = () => {
  return (
    <div>
      <Routess/>
{/* asds */}
      <Drift
      appId={process.env.REACT_APP_CHAT_BOT}
      style={{
        bottom: "100px",
      }}
      />
    </div>
  );
};

export default App;
