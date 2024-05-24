import { useState, useEffect, useRef } from "react";

const useTypeWriter = (onComplete) => {
  const [isTypeWriterRunning, setIsTypeWriterRunning] = useState(false); // State to check if typewriter is running
  const [typeWriterText, setTypeWriterText] = useState(""); // typewriter text
  const [speed, setSpeed] = useState(500);
  const [sourceText, setSourceText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(); // Store interval to output each letter at specified time interval

  const maxSpeed = 500;

  // function to get next character of string text
  const getNextChar = () => {
    // Get the character at the current index
    const newChar = sourceText.charAt(currentIndex);
    // update current index to point at next index value
    setCurrentIndex((prevIndex) => prevIndex + 1);
    return newChar;
  };

  // effect hook to execute function when isTypeWriterRunning is true, current index changes or speed changes
  useEffect(() => {
    // if typewriter is running and still letters to print
    if (isTypeWriterRunning && currentIndex < sourceText.length) {
      // set effective speed
      const effectiveSpeed = speed;
      // use intervalRef to store return value of setInterval function
      intervalRef.current = setInterval(
        () => {
          // callback function to update typewriter text
          //append next character to typeWriterText, call function to get next Char
          setTypeWriterText((prevText) => prevText + getNextChar());
        },
        Math.max(effectiveSpeed, 0),
      );
    } else if (isTypeWriterRunning && currentIndex >= sourceText.length) {
      clearInterval(intervalRef.currentIndex);
      setIsTypeWriterRunning(false);
      if (onComplete) {
        onComplete();
      }
    }
    // return function to cleanup
    return () => clearInterval(intervalRef.current);
  }, [isTypeWriterRunning, currentIndex, speed]);

  function startTypeWriter(newText, newSpeed) {
    if (newText) {
      setSourceText(newText); // if newText has value, set Source text
    }

    if (newSpeed) {
      setSpeed(newSpeed); // if newSpeed has value, set speed
    }

    setIsTypeWriterRunning(true);
  }

  return {
    typeWriterText,
    isTypeWriterRunning,
    startTypeWriter,
  };
};

export default useTypeWriter;
