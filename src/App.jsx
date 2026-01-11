import { useState } from "react";
import IntroVideo from "./components/IntroVideo";
import { Routes, Route } from "react-router-dom";
import Stands from "./sections/Stands";
import TimelineExperience from "./sections/TimelineExperience";
import HeroSplit from "./components/HeroSplit";
import ProjectDetail from "./sections/ProjectDetail";
import Design from "./sections/Design";

function App() {
  function HomeWithIntro() {
    const [showIntro, setShowIntro] = useState(true);
    return (
      <>
        {showIntro && (
          <IntroVideo
            src="/videos/intro.mp4"
            onEnded={() => setShowIntro(false)}
          />
        )}
        {!showIntro && <HeroSplit />}
      </>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomeWithIntro />} />
      <Route path="/design" element={<Design />} />
      <Route path="/stands" element={<Stands />} />
      <Route path="/stands/timeline" element={<TimelineExperience />} />
      <Route path="/stands/project/:slug" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;
