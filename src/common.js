const { format } = require('date-fns')
const util = require('util')

function now(dateFormat = 'yyyy-MM-dd HH:mm:ss') {
    const now = new Date()
    return format(now, dateFormat)
}
function toFormat(level, text) {
    return util.format('%s [%s] %s\n', now(), level, text)
}
function replace(msg, data) {
    return msg.replace(/\{\{(\w+)\}\}/g, (match, name) => data[name] || match)
}

exports.now = now
exports.toFormat = toFormat
exports.replace = replace
