const log = require('../index')

async function test() {
    console.time()
    for (let i = 0; i < 100000; i++) {
        await log.info('这是一个测试日志,%s', i)
    }
    console.timeEnd()
    await log.shutdown()
}
test()
