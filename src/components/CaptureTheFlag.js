import React, { useState, useEffect } from "react";
import useTypeWriter from "../hooks/useTypeWriter"; // import typewriter hook

const BASE_URL =
  "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/656e63";

function CaptureTheFlag() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState("");

  const {
    typeWriterText,
    isTypeWriterRunning,
    startTypeWriter,
    stopTypeWriter,
  } = useTypeWriter();

  useEffect(() => {
    // async fetch
    const fetchFlag = async () => {
      setIsLoading(true); // show loading screen until data is fetched via API
      // try block to fetch flag
      try {
        const response = await fetch(BASE_URL);
        const flag = await response.text();
        setFlag(flag); // load flag text into State
        startTypeWriter(flag, 20); // Start the typewriter effect with the fetched flag
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // reset to stop loading screen
      }
    };
    fetchFlag();
  }, [startTypeWriter]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Flag not found. Please try again.</div>;
  }

  return (
    <div className="App">
      <ul>
        {typeWriterText.split("").map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
    </div>
  );
}

export default CaptureTheFlag;

// JavaScript code snippet used to get URL for flag
// document.addEventListener('DOMContentLoaded', function()
// {
// function findPattern() {
// Find all <code> elements with the specified pattern
// const codeElements = document.querySelectorAll('code[data-class^="23"]');
// let URL = '';

// codeElements.forEach(code => {
// const div = code.querySelector('div[data-tag$="93"]');
// if (div) {
// const span = div.querySelector('span[data-id*="21"]');
// if (span) {
// const i = span.querySelector('i.char');
// if (i) {
// const value = i.getAttribute('value');
// URL += value;
// }
// }
// }
// });
// console.log(URL);
// }
// findPattern();
// });
