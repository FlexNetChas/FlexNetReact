import { useEffect, useRef } from "react";
import Stats from "stats.js";

// Simple performance panel using stats.js to monitor FPS and rendering performance
export default function PerformancePanel() {
  const statsRef = useRef<Stats | null>(null);

  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    stats.dom.style.position = "absolute";
    stats.dom.style.top = "0px";
    stats.dom.style.left = "0px";
    document.body.appendChild(stats.dom);
    statsRef.current = stats;

    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);

  return null;
}
