import React from "react";

function LazyLoad(path: string) {
  return React.lazy(() => import(`${path}`));
}

export default LazyLoad;