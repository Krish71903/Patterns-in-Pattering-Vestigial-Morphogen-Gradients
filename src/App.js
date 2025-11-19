import GradientProfilesRaw from "./components/GradientProfilesRaw";
import WingDiscVsD from "./components/WingDiscVsD";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",    
        alignItems: "flex-start",   
        padding: "40px",
        gap: "60px"                
      }}
    >
      <div style={{ width: "1000px" }}>
       
        <WingDiscVsD />
      </div>

      <div style={{ width: "1000px" }}>
         <GradientProfilesRaw />
      </div>
    </div>
  );
}

export default App;