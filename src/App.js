import React, { useState } from "react";
import WingDiscVsD from "./components/WingDiscVsD";
import GradientProfilesRaw from "./components/GradientProfilesRaw";

function App() {
  const [selectedDiscs, setSelectedDiscs] = useState([]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "40px",
        gap: "40px",
        background: "#fafafa"
      }}
    >
      <GradientProfilesRaw selectedDiscIDs={selectedDiscs} />

      <WingDiscVsD onSelectionChange={setSelectedDiscs} />
    </div>
  );
}

export default App;
