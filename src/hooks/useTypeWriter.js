import { useState } from "react";

const useTypeWriter = (onComplete) => {
  const [isTypeWriterRunning, setIsTypeWriterRunning] = useState(false);
  const [typeWriterText, setTypeWriterText] = useState("");
  const [speed, setSpeed] = useState(50);
  const [sourceText, setSourceText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
};

export default useTypeWriter;
