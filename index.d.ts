import { ExecutorOptions, Executor } from 'process-worker-executor'

interface LoggerOptions {
    /**
     * @default path.join(process.cwd(),'logs')
     */
    path?: String
    /**
     * @default app
     */
    name?: String
    /**
     * @default true
     */
    isRotating?: Boolean
    /**
     * 打印控制台
     * @default true
     */
    hasConsole?: Boolean

    /**
     * @default Worker
     */
    executor?: Executor
    /**
     * @default {
     *     ttl: 60 * 1000,
     *     metedata: {},
     *     logFile: 'executor',
     *     logPath: path
     *  }
     */
    executorOptions?: ExecutorOptions
}

interface Logger {
    info(msg: String, ...args: unknown[] | {}): void
    error(msg: String, ...args: unknown[] | {}): void
    warning(msg: String, ...args: unknown[] | {}): void
}

export declare function createLogger(options: LoggerOptions): Logger
/**
 *
 * @example log.info('这是一个示例日志')
 * @example log.info('这是一个示例日志,%s-%s','占位符参数','占位符参数')
 * @example log.info('这是一个示例日志,{{name}}',{name: '占位符参数'})
 * @param msg 日志文本
 * @param args 参数列表或者对象
 */
export declare function info(msg: String, ...args: unknown[] | {}): void
/**
 *
 * @example log.info('这是一个示例日志')
 * @example log.info('这是一个示例日志,%s-%s','占位符参数','占位符参数')
 * @example log.info('这是一个示例日志,{{name}}',{name: '占位符参数'})
 * @param msg 日志文本
 * @param args 参数列表或者对象
 */
export declare function error(msg: String, ...args: unknown[] | {}): void
/**
 *
 * @example log.info('这是一个示例日志')
 * @example log.info('这是一个示例日志,%s-%s','占位符参数','占位符参数')
 * @example log.info('这是一个示例日志,{{name}}',{name: '占位符参数'})
 * @param msg 日志文本
 * @param args 参数列表或者对象
 */
export declare function warning(msg: String, ...args: unknown[] | {}): void
