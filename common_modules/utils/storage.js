(function () {
  if (!sessionStorage.length) {
    // 这个调用能触发目标事件，从而达到共享数据的目的
    localStorage.setItem('getSessionStorage', Date.now());
  }

  const storageEvent = (event) => {
    if (event.key === 'getSessionStorage') {
      // 已存在的标签页会收到这个事件
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      localStorage.removeItem('sessionStorage');
    } else if (event.key === 'sessionStorage' && sessionStorage.length < 2) {
      // 新开启的标签页会收到这个事件
      let data = JSON.parse(event.newValue);

      for (let key in data) {
        sessionStorage.setItem(key, data[key]);
      }
    }
  };

  // 该事件是核心
  if (window.attachEvent) {
    // IE
    window.attachEvent('onstorage', (event) => {
      storageEvent(event);
    });
  } else {
    // chrome、Firefox
    window.addEventListener('storage', (event) => {
      storageEvent(event);
    });
  }
})();

const storage = sessionStorage;

const Storage = {
  // 存sessionStorage
  set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    storage.setItem(key, value);
  },
  // 获取sessionStorage
  get(key) {
    let value = storage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  // 移除sessionStorage某个key
  remove(key) {
    storage.setItem(key, JSON.stringify({}));
  }
};

export { Storage };
