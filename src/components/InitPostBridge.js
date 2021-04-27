import { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import { PostBridge } from '@kaokei/post-bridge/dist/index.es2015';

import { message as antdMessage } from 'antd';

export const postBridge =
  window.top === window.self ? null : new PostBridge(window.top);

export const message = {
  success(msg) {
    if (window.top === window.self) {
      antdMessage.success(msg);
    } else {
      postBridge.call('messageSuccess', msg);
    }
  },
  info(msg) {
    if (window.top === window.self) {
      antdMessage.info(msg);
    } else {
      postBridge.call('messageInfo', msg);
    }
  },
  warning(msg) {
    if (window.top === window.self) {
      antdMessage.warning(msg);
    } else {
      postBridge.call('messageWarning', msg);
    }
  },
  error(msg) {
    if (window.top === window.self) {
      antdMessage.error(msg);
    } else {
      postBridge.call('messageError', msg);
    }
  },
};

function InitPostBridge(props) {
  const history = useHistory();

  useEffect(() => {
    PostBridge.registerMethods({
      pushState(route = {}) {
        const path = route.path;
        console.log('pushState path :>> ', path);
        // 这里需要/作为前缀
        const newPath = path[0] === '/' ? path : '/' + path;
        history.push(newPath);
      },
      replaceState(route = {}) {
        const path = route.path;
        console.log('replaceState path :>> ', path);
        // 这里需要/作为前缀
        const newPath = path[0] === '/' ? path : '/' + path;
        history.replace(newPath);
      },
      go(args) {
        history.go(args);
      },
    });

    PostBridge.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    postBridge && postBridge.call('resetScroll');
  }, [props.location.pathname]);

  return null;
}

export default withRouter(InitPostBridge);
