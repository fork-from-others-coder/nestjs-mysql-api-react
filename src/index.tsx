import dva from 'dva';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import './assets/style/global.less';
import 'antd/dist/antd.css';
import globalModel from 'src/models/global';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import routeConfig from 'src/router';
import 'moment/locale/zh-cn';

const localStorageState: string = '@@LOCAL_STORAGE_STATE';
const getStorageData = () => {
  const state = window.localStorage.getItem(localStorageState);
  if (state) {
    return typeof state === 'string' ? JSON.parse(state) : state;
  } else {
    return {};
  }
};

const app = dva({
  history: createHistory({
    basename: 'admin-web', // 配置项目名,可以不写
  }),
  // 数据持久化
  initialState: getStorageData(),
  onStateChange: function () {
    const preState = getStorageData();
    // eslint-disable-next-line
    localStorage.setItem(localStorageState, JSON.stringify(Object.assign(preState, arguments[0])));
  },
});

app.use(createLoading());
app.model(globalModel);
app.router(routeConfig as any);

const App = app.start();

ReactDOM.render(
  <ConfigProvider
    locale={zhCN}
    getPopupContainer={() => document.getElementById('root') || document.createElement('div')}
  >
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);

// https://www.npmjs.com/package/redux-persist
