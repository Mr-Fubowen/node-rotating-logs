import { ExecutorOptions, Executor, AsyncProxy } from 'process-worker-executor'

export interface LoggerOptions {
    /**
     * 可通过环境变量赋值 NODE_LOG_DEBUG
     * 优先级：默认值 < NODE_LOG_DEBUG < 手动传递
     * 调试模式，启用调试模式后 log.debug() 函数会输出调试信息
     * @default false
     */
    debug?: Boolean
    /**
     * 可通过环境变量赋值 NODE_LOG_PATH
     * 优先级：默认值 < NODE_LOG_PATH < 手动传递
     * @default path.join(process.cwd(),'logs')
     */
    path?: String
    /**
     * 可通过环境变量赋值 NODE_LOG_NAME
     * 优先级：默认值 < NODE_LOG_NAME < 手动传递
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
     * 后台采用线程还是进程执行
     * @default Worker
     */
    executor?: Executor
    /**
     * 请注意，默认的情况下 logPath 和 logFile 有默认值，因此会输出
     * exector.txt，exector-client.txt 日志，可以传递 null 禁用 exector 的日志输出
     * @default {
     *     ttl: 60 * 1000,
     *     metedata: {},
     *     logFile: 'executor',
     *     logPath: path
     *  }
     */
    executorOptions?: ExecutorOptions
}
export interface Logger {
    info(msg: String, ...args: unknown[] | {}): Promise
    error(msg: String, ...args: unknown[] | {}): Promise
    warning(msg: String, ...args: unknown[] | {}): Promise
    debug(msg: String, ...args: unknown[] | {}): Promise
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
export declare function info(msg: String, ...args: unknown[] | {}): Promise
/**
 *
 * @example log.error('这是一个示例日志')
 * @example log.error('这是一个示例日志,%s-%s','占位符参数','占位符参数')
 * @example log.error('这是一个示例日志,{{name}}',{name: '占位符参数'})
 * @param msg 日志文本
 * @param args 参数列表或者对象
 */
export declare function error(msg: String, ...args: unknown[] | {}): Promise
/**
 *
 * @example log.warning('这是一个示例日志')
 * @example log.warning('这是一个示例日志,%s-%s','占位符参数','占位符参数')
 * @example log.warning('这是一个示例日志,{{name}}',{name: '占位符参数'})
 * @param msg 日志文本
 * @param args 参数列表或者对象
 */
export declare function warning(msg: String, ...args: unknown[] | {}): Promise
/**
 *
 * @example log.debug('这是一个示例日志')
 * @example log.debug('这是一个示例日志,%s-%s','占位符参数','占位符参数')
 * @example log.debug('这是一个示例日志,{{name}}',{name: '占位符参数'})
 * @param msg 日志文本
 * @param args 参数列表或者对象
 */
export declare function debug(msg: String, ...args: unknown[] | {}): Promise
/**
 * 默认日志记录器配置
 * 可直接覆盖此对象中的配置项来修改默认日志输出地址和名称
 */
export declare let defaultOptions: LoggerOptions
/**
 * Worker 或者 Process 代理对象
 * 调用 logger._dispose() 函数手动关闭 Worker 或者 Process
 * 注意：一般不需要手动释放，在 TTL 参数指定的时间间隔内，没有新的函数调用则会自动释放
 */
export declare let logger: AsyncProxy
