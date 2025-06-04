const { isPlainObject, merge } = require('lodash')
const { format } = require('util')
const { requireScript } = require('process-worker-executor')
const { join } = require('path')
const { replace } = require('./src/common')

let logger

function createLogger(name, options) {
    let opts = {
        path: join(process.cwd(), 'logs'),
        name: name || 'app',
        isRotating: true,
        hasConsole: true,
        executor: 'Worker',
        executorOptions: {
            ttl: 10 * 1000,
            metedata: {},
            logFile: 'exector',
            logPath: this.path
        }
    }
    merge(opts, options)
    if (!logger) {
        const path = join(__dirname, './src/logger.js')
        console.log("调用一次")
        logger = requireScript(path, opts.executor, opts.executorOptions)
    }
    return {
        async append(level, msg, args) {
            let text = msg
            if (args && args.length == 1 && isPlainObject(args.at(0))) {
                text = replace(msg, args.at(0))
            } else {
                text = format(msg, ...args)
            }
            let other = {
                hasConsole: opts.hasConsole
            }
            if (opts.isRotating) {
                return logger.appendRotatingFile(opts.path, opts.name, level, text, other, true)
            } else {
                return logger.appendFile(opts.path, opts.name, level, text, other, true)
            }
        },
        async info(msg, ...args) {
            return this.append('INF', msg, args)
        },
        async error(msg, ...args) {
            return this.append('ERR', msg, args)
        },
        async warning(msg, ...args) {
            return this.append('WAN', msg, args)
        }
    }
}
const app = createLogger('app', false, true)

module.exports = {
    createLogger,
    ...app
}
