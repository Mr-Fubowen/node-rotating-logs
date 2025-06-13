const rfs = require('rotating-file-stream')
const util = require('util')
const fs = require('fs-extra')
const { join } = require('path')
const colors = require('colors-console')
const { toFormat, now } = require('./common')

const streams = new Map()

async function createFileStream(root, type, options) {
    const { isRotating, level } = options || {}
    const id = type + '-' + level
    let item = streams.get(id)
    if (item) {
        return item
    }
    item = {
        id
    }
    const path = join(root, type)
    const name = level + '.txt'
    if (isRotating) {
        item.stream = rfs.createStream(name, {
            path: path,
            size: '10M',
            interval: '1M',
            compress: 'gzip',
            encoding: 'utf8'
        })
    } else {
        await fs.ensureDir(path)
        item.stream = fs.createWriteStream(join(path, name), { encoding: 'utf-8' })
    }
    streams.set(id, item)
    return item
}
async function appendFile(root, name, level, text) {
    const { id, stream } = await createFileStream(root, name, { level })
    const msg = toFormat(level, text)
    await new Promise((resolve, reject) => {
        stream.write(msg, error => {
            if (error) {
                return reject(error)
            }
            resolve()
        })
    })
    if (options?.hasConsole) {
        appendConsole(level, text)
    }
    return id
}
async function appendRotatingFile(root, name, level, text, options) {
    const { id, stream } = await createFileStream(root, name, { isRotating: true, level })
    const msg = toFormat(level, text)
    await new Promise((resolve, reject) => {
        stream.write(msg, error => {
            if (error) {
                return reject(error)
            }
            resolve()
        })
    })
    if (options?.hasConsole) {
        appendConsole(level, text)
    }
    return id
}
function appendConsole(level, text) {
    let time = colors('grey', now())
    let type
    switch (level) {
        case 'INF':
            text = colors('blue', text)
            type = colors('blue', level)
            break
        case 'WAN':
            text = colors('yellow', text)
            type = colors('yellow', level)
            break
        case 'ERR':
            text = colors('red', text)
            type = colors('red', level)
            break
        case 'SUC':
            text = colors('green', text)
            type = colors('green', level)
            break
    }
    const msg = util.format('%s [%s] %s', time, type, text)
    console.log(msg)
}
function toTask(item) {
    return new Promise(resolve => {
        let { id, stream } = item
        streams.delete(id)
        if (stream.destroyed || stream.closed) {
            resolve()
        } else {
            stream.end(resolve)
        }
    })
}
async function close(id) {
    let tasks = []
    if (id) {
        let item = streams.get(id)
        if (item) {
            tasks.push(toTask(item))
        }
    } else {
        streams.forEach(item => tasks.push(toTask(item)))
    }
    return Promise.all(tasks)
}

module.exports = {
    appendFile,
    appendRotatingFile,
    appendConsole,
    close
}
