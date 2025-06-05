# Node-Rotating-Logs

Node 程序的滚动文件日志，和非滚动文件以及控制台日志的简单实现

## 使用

可使用 **{{参数名称}}** 这样的插值写法，也可以使用占位符写法

```js
const log = require('node-rotating-logs')

log.info('这是一个测试日志')
// 插值
log.info('这是一个测试日志,{{a}}', {a:123})
// 占位
log.info('这是一个测试日志,%s', '占位符')
// 其他
log.error('这是一个测试日志,%s', '占位符')
log.warning('这是一个测试日志,%s', '占位符')
log.debug('这是一个测试日志,%s', '占位符')

// 自己创建日志记录器
let logger = createLogger(...)
```

## 相关

1. 使用了 [process-worker-executor](https://www.npmjs.com/package/process-worker-executor) 作为多线程多进程实现
2. **npm install process-worker-executor**
