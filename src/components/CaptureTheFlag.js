import React, { useState, useEffect } from "react";

const BASE_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656e63";

function CaptureTheFlag() {
  const [flag, setFlag] = useState("");
  console.log("test");
  useEffect(() => {
    // async fetch
    const fetchFlag = async () => {
      try {
        console.log("Fetching data from:", BASE_URL);
        const response = await fetch(BASE_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // converting reponse to JSON
        const flag = await response.text();
        setFlag(flag);
        console.log(flag);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchFlag();
  }, []);

  return (
    <div className="App">
      <div>{flag ? <div>{flag}</div> : "Loading..."}</div>
    </div>
  );
}

export default CaptureTheFlag;
