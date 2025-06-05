const log = require('../index')

async function test() {
    for (let i = 0; i < 10; i++) {
        log.info('这是一个测试日志,%s', i)
        log.error('这是一个测试日志,%s', i)
        log.warning('这是一个测试日志,%s', i)
        log.debug('这是一个测试日志,%s', i)
    }
}
test()
