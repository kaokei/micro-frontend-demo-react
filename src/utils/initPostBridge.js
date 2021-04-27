import { PostBridge } from '@kaokei/post-bridge/dist/index.es2015';

import { message as antdMessage } from 'antd';

const appName = 'demo-vue2';

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

export const postBridge = new PostBridge(window.top);

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

router.pushTopState = to => {
  if (window.top === window.self) {
    return router.push(to);
  } else {
    const route = router.resolve(to);
    console.log('resolve route :>> ', route);
    return Promise.resolve().then(
      () =>
        postBridge &&
        postBridge.call('pushState', {
          appName,
          path: route.href,
        })
    );
  }
};

router.replaceTopState = to => {
  if (window.top === window.self) {
    return router.replace(to);
  } else {
    const route = router.resolve(to);
    return Promise.resolve().then(
      () =>
        postBridge &&
        postBridge.call('replaceState', {
          appName,
          path: route.href,
        })
    );
  }
};

router.afterEach(() => {
  postBridge && postBridge.call('resetScroll');
});
