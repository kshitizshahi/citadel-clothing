import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  // const { pending, error } = useSelector(
  //     (state: RootState) => state.apiProgress
  // );
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 70) {
          clearInterval(timer);
          setProgress(100);
        }

        return Math.min(oldProgress + Math.random() * 10, 70);
      });
    }, 350);

    // if (pending) {
    //     clearInterval(timer);
    //     setProgress(100);
    // }

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div
      id="progress-bar-wrap"
      style={{
        width: "100%",
        height: "4px",
        backgroundColor: "white",
      }}
    >
      {console.log("WIDTH:", progress)}
      <div
        id="progress-bar"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "crimson",
          transition: "width 0.4s linear",
        }}
      ></div>
    </div>
  );
};
export default ProgressBar;
