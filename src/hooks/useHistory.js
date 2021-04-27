import { useHistory as useReactHistory } from "react-router-dom";

import { postBridge } from "../components/InitPostBridge";

const appName = "demo-react";

const fakeHistory = {
  push(path) {
    postBridge &&
      postBridge.call("pushState", {
        appName,
        path,
      });
  },
  replace(path) {
    postBridge &&
      postBridge.call("replaceState", {
        appName,
        path,
      });
  },
};

export function useHistory() {
  const history = useReactHistory();
  if (window.top === window.self) {
    return history;
  } else {
    return fakeHistory;
  }
}
