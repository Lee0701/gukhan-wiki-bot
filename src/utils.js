
const axios = require('axios')

const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || ''

const buildProps = (args) => {
    return Object.fromEntries(args.map((entry) => entry.split('=')))
}

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}年${month}月${day}日`
}

const webScreenshot = async (url) => {
    const {data} = await axios.create().get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?key=${PAGESPEED_API_KEY}&url=${url}`)
    return data['lighthouseResult']['fullPageScreenshot']['screenshot']['data']
}

module.exports = {
    buildProps,
    formatDate,
    webScreenshot,
}
