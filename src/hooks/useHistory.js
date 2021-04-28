import { useHistory as useReactHistory } from 'react-router-dom';

import { postBridge } from '../components/InitPostBridge';

const appName = 'demo-react';

export function useHistory() {
  const history = useReactHistory();
  if (window.top === window.self) {
    return history;
  } else {
    return {
      push(path) {
        history.push(path);
        postBridge &&
          postBridge.call('pushState', {
            appName,
            path,
          });
      },
      replace(path) {
        history.replace(path);
        postBridge &&
          postBridge.call('replaceState', {
            appName,
            path,
          });
      },
    };
  }
}
