import React, { useState, useContext } from "react";
import Context from "./Context";
const useServerEffect = (initial, key, effect) => {
  const context = useContext(Context);
  const [data] = useState(context[key] || initial);

  if (context.requests) {
    context.requests.push(effect().then((data) => (context[key] = data)));
  }

  return [data];
};
export default useServerEffect;
