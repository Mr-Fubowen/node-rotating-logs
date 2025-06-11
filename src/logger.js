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
    let stream = streams.get(id)
    if (stream) {
        return stream
    }
    const path = join(root, type)
    const name = level + '.txt'
    if (isRotating) {
        stream = rfs.createStream(name, {
            path: path,
            size: '10M',
            interval: '1M',
            compress: 'gzip',
            encoding: 'utf8'
        })
    } else {
        await fs.ensureDir(path)
        stream = fs.createWriteStream(join(path, name), { encoding: 'utf-8' })
    }
    streams.set(id, stream)
    return stream
}
async function appendFile(root, name, level, text) {
    const stream = await createFileStream(root, name, { level })
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
}
async function appendRotatingFile(root, name, level, text, options) {
    const stream = await createFileStream(root, name, { isRotating: true, level })
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
async function close(name) {
    if (name) {
        streams.get(name)?.end()
    } else {
        streams.forEach(stream => stream.end())
    }
}

module.exports = {
    appendFile,
    appendRotatingFile,
    appendConsole,
    close
}
