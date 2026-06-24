"use client";
import { useEffect } from "react";

const Dependency = () => {
  useEffect(() => {
    // Dynamically import Bootstrap JS to avoid SSR issues
    import("bootstrap/dist/js/bootstrap.bundle.min.js")
      .then(() => {})
      .catch((err) => {
        console.error("Project loading ...:", err);
      });
  }, []);

  return null;
};

export default Dependency;
