import React, { useRef, useEffect } from "react";

function Demo() {
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      //
    }
    // outside click
    console.log("you click outside");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <input ref={node} type="text" value="THis is my demo" />
      <button onClick={handleClick}>Click</button>
    </>
  );
}

export default Demo;
