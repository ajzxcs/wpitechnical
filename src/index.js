import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Check if the visitor count exists in local storage
    const storedCount = localStorage.getItem("visitorCount");

    if (storedCount) {
      setVisitorCount(parseInt(storedCount));
    } else {
      // If not, initialize it to 1
      setVisitorCount(1);
    }
  }, []);

  useEffect(() => {
    // Update the visitor count in local storage
    localStorage.setItem("visitorCount", visitorCount.toString());
  }, [visitorCount]);

  return (
    <div>
      <p>Website Visitor Count: {visitorCount}</p>
    </div>
  );
}

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <VisitorCounter />
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
