import { ExecutorOptions, Executor, AsyncProxy } from 'process-worker-executor'

export interface LoggerOptions {
    /**
     * 可通过环境变量赋值 NODE_LOG_DEBUG
     * 优先级：默认值 < NODE_LOG_DEBUG < 手动传递
     * 调试模式，启用调试模式后 log.debug() 函数会输出调试信息
     * @default false
     */
    debug?: boolean

    /**
     * 可通过环境变量赋值 NODE_LOG_PATH
     * 优先级：默认值 < NODE_LOG_PATH < 手动传递
     * @default path.join(process.cwd(), 'logs')
     */
    path?: string

    /**
     * 可通过环境变量赋值 NODE_LOG_NAME
     * 优先级：默认值 < NODE_LOG_NAME < 手动传递
     * @default 'app'
     */
    name?: string

    /**
     * 是否开启日志文件归档（轮转）
     * @default true
     */
    isRotating?: boolean

    /**
     * 是否打印到控制台
     * @default true
     */
    hasConsole?: boolean

    /**
     * 后台采用线程还是进程执行
     * @default 'Worker'（需要确认 `Executor` 类型定义是否支持字符串，建议使用正确的类型）
     */
    executor?: Executor

    /**
     * 日志执行器相关配置
     * 默认配置示例：
     * {
     *   ttl: 60 * 1000,
     *   metadata: {},
     *   logFile: 'executor',
     *   logPath: path
     * }
     * 可以传递 logPath：null，logFile：null 禁用此日志输出
     */
    executorOptions?: ExecutorOptions
}

export interface Logger {
    /**
     * 输出信息级别日志
     * @param msg 日志文本
     * @param args 参数列表或对象
     * @returns Promise<void>
     */
    info(msg: string, ...args: unknown[]): Promise<void>
    info(msg: string, args: object): Promise<void>

    /**
     * 输出错误级别日志
     * @param msg 日志文本
     * @param args 参数列表或对象
     * @returns Promise<void>
     */
    error(msg: string, ...args: unknown[]): Promise<void>
    error(msg: string, args: object): Promise<void>

    /**
     * 输出警告级别日志
     * @param msg 日志文本
     * @param args 参数列表或对象
     * @returns Promise<void>
     */
    warning(msg: string, ...args: unknown[]): Promise<void>
    warning(msg: string, args: object): Promise<void>

    /**
     * 输出成功级别日志
     * @param msg 日志文本
     * @param args 参数列表或对象
     * @returns Promise<void>
     */
    success(msg: string, ...args: unknown[]): Promise<void>
    success(msg: string, args: object): Promise<void>

    /**
     * 输出调试信息
     * @param msg 日志文本
     * @param args 参数列表或对象
     * @returns Promise<void>
     */
    debug(msg: string, ...args: unknown[]): Promise<void>
    debug(msg: string, args: object): Promise<void>
}

/**
 * 创建一个日志实例
 * @param options 配置项
 * @returns Logger实例
 */
export declare function createLogger(options: LoggerOptions): Logger

/**
 * 以多种方式记录日志
 * @example
 * log.info('这是一个示例日志')
 * log.info('这是一个示例日志,%s-%s', '占位符参数', '占位符参数')
 * log.info('这是一个示例日志,{{name}}', { name: '占位符参数' })
 */
export declare function info(msg: string, ...args: unknown[]): Promise<void>
export declare function info(msg: string, args: object): Promise<void>

/**
 * 以多种方式记录错误日志
 * @example
 * log.error('这是一个示例日志')
 * log.error('这是一个示例日志,%s-%s', '占位符参数', '占位符参数')
 * log.error('这是一个示例日志,{{name}}', { name: '占位符参数' })
 */
export declare function error(msg: string, ...args: unknown[]): Promise<void>
export declare function error(msg: string, args: object): Promise<void>

/**
 * 以多种方式记录警告日志
 * @example
 * warning('这是一个示例日志')
 * warning('这是一个示例日志,%s-%s', '占位符参数', '占位符参数')
 * warning('这是一个示例日志,{{name}}', { name: '占位符参数' })
 */
export declare function warning(msg: string, ...args: unknown[]): Promise<void>
export declare function warning(msg: string, args: object): Promise<void>

/**
 * 以多种方式记录成功日志
 * @example
 * success('这是一个示例日志')
 * success('这是一个示例日志,%s-%s', '占位符参数', '占位符参数')
 * success('这是一个示例日志,{{name}}', { name: '占位符参数' })
 */
export declare function success(msg: string, ...args: unknown[]): Promise<void>
export declare function success(msg: string, args: object): Promise<void>

/**
 * 以多种方式记录调试信息
 * @example
 * debug('这是一个示例日志')
 * debug('这是一个示例日志,%s-%s', '占位符参数', '占位符参数')
 * debug('这是一个示例日志,{{name}}', { name: '占位符参数' })
 */
export declare function debug(msg: string, ...args: unknown[]): Promise<void>
export declare function debug(msg: string, args: object): Promise<void>

/**
 * 默认日志配置，可以覆盖此对象中的配置项以修改默认行为
 */
export declare let defaultOptions: LoggerOptions

/**
 * Worker 或 Process 代理对象
 * 调用 logger._dispose() 以手动关闭 Worker 或 Process
 * 注意：通常无需手动释放，TTL时间内无新的调用会自动释放
 */
export declare let logger: AsyncProxy<unknown>
