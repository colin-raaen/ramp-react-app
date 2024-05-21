import React, { useState, useEffect } from "react";

const BASE_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656e63";

function CaptureTheFlag() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    // async fetch
    const fetchFlag = async () => {
      setIsLoading(true); // show loading screen until data is fetched via API
      // try block to fetch flag
      try {
        const response = await fetch(BASE_URL);
        const flag = await response.text();
        setFlag(flag); // load flag text into State
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // reset to stop loading screen
      }
    };
    fetchFlag();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Flag not found. Please try again.</div>;
  }

  return (
    <div className="App">
      <div>{flag}</div>
    </div>
  );
}

export default CaptureTheFlag;
