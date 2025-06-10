const log = require('../index')

async function test() {
    for (let i = 0; i < 100000; i++) {
        await log.info('这是一个测试日志,%s', i)
    }
    log.shutdown()
}
test()
