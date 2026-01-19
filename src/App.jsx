import { useState, useEffect } from "react";
import IntroVideo from "./components/IntroVideo";
import { Routes, Route, useLocation } from "react-router-dom";
import Stands from "./sections/Stands";
import TimelineExperience from "./sections/TimelineExperience";
import HeroSplit from "./components/HeroSplit";
import ProjectDetail from "./sections/ProjectDetail";
import Design from "./sections/Design";
import IndustriasVintage from "./sections/IndustriasVintage";

function App() {
  function Analytics() {
    const location = useLocation();
    useEffect(() => {
      if (window.gtag) {
        window.gtag("config", "G-XQSBLF6D0", {
          page_path: location.pathname + location.search,
          page_title: document.title,
        });
      }
    }, [location.pathname, location.search]);
    return null;
  }
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
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomeWithIntro />} />
        <Route path="/design" element={<Design />} />
        <Route path="/design/vintage" element={<IndustriasVintage />} />
        <Route path="/stands" element={<Stands />} />
        <Route path="/stands/timeline" element={<TimelineExperience />} />
        <Route path="/stands/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

export default App;
