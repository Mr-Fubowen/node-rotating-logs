const { isPlainObject, merge } = require('lodash')
const { format } = require('util')
const { requireScript } = require('process-worker-executor')
const { join } = require('path')
const { replace } = require('./src/common')

let logger
let logPath = join(process.cwd(), 'temp', 'log')
let defaultOptions = {
    path: logPath,
    name: 'app',
    isRotating: true,
    hasConsole: true,
    debug: false,
    executor: 'Worker',
    executorOptions: {
        ttl: 60 * 1000,
        metedata: {},
        logFile: 'exector',
        logPath: logPath
    }
}
let envOptions = {
    path: process.env.NODE_LOG_PATH,
    name: process.env.NODE_LOG_NAME,
    debug: process.env.NODE_LOG_DEBUG
}
function loadLogger(opts) {
    const path = join(__dirname, './src/logger.js')
    return requireScript(path, opts.executor, opts.executorOptions)
}
function createLogger(options) {
    let opts = merge({}, defaultOptions, envOptions, options)
    let ids = new Set()
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
            logger ||= loadLogger(opts)
            let id
            if (opts.isRotating) {
                id = await logger.appendRotatingFile(opts.path, opts.name, level, text, other, true)
            } else {
                id = await logger.appendFile(opts.path, opts.name, level, text, other, true)
            }
            ids.add(id)
        },
        async info(msg, ...args) {
            return this.append('INF', msg, args)
        },
        async error(msg, ...args) {
            return this.append('ERR', msg, args)
        },
        async warning(msg, ...args) {
            return this.append('WAN', msg, args)
        },
        async debug(msg, ...args) {
            if (opts.debug) {
                return this.append('DBG', msg, args)
            }
        },
        async close() {
            for (const id of ids.values()) {
                await logger.close(id, true)
            }
        }
    }
}
const app = createLogger()

module.exports = {
    createLogger,
    defaultOptions,
    ...app,
    logger,
    async shutdown() {
        await logger?._dispose()
        logger = null
    }
}
