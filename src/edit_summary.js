
require('dotenv').config()
const axios = require('axios')
const combineURLs = require('axios/lib/helpers/combineURLs')

const { buildProps, webScreenshot } = require('./utils')
const tweet = require('./tweet')

const BASE_URL = process.env.BASE_URL || ''
const WIKI_URL = process.env.WIKI_URL || ''
const API_ENDPOINT = process.env.API_ENDPOINT || '/api.php'

const ax = axios.create({
    baseURL: BASE_URL,
})

const editSummary = async (props) => {
    const rcstart = new Date(parseInt(props.rcstart) || new Date().getTime())
    const rcend = new Date(parseInt(props.rcend*1000) || (new Date().getTime() - 1000*60*60))
    const rclimit = props.rclimit || 20
    const rcnamespace = props.rcnamespace || '0'

    const recentchanges = []
    let rccontinue = null
    do {
        const {data} = await ax.get(API_ENDPOINT, {
            params: {
                format: 'json',
                action: 'query',
                list: 'recentchanges',
                rcprop: 'title|sizes|tags',
                rclimit,
                rcnamespace,
                rcstart: rcstart.toISOString(),
                rcend: rcend.toISOString(),
                rccontinue,
            },
        })
        recentchanges.push(...data.query.recentchanges)
        rccontinue = data.continue ? data.continue.rccontinue : null
    } while(rccontinue)
    
    const pages = {}
    const excludeTags = ['mw-new-redirect']
    for(let data of recentchanges) {
        if(data.tags && data.tags.some((tag) => excludeTags.includes(tag))) continue
        const {title, oldlen, newlen} = data
        const lengthDiff = newlen - oldlen
        if(!pages[title]) pages[title] = lengthDiff
        else pages[title] += lengthDiff
    }

    const topPages = Object.entries(pages)
            .filter((entry) => entry[1] > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
    if(!topPages.length) return

    const topPageUrl = combineURLs(WIKI_URL, encodeURIComponent(topPages[0][0]))
    const screenshot = await webScreenshot(encodeURIComponent(topPageUrl))
    const screenshotData = screenshot.replace('data:image/webp;base64', '')

    const timeDiff = Math.round((rcstart.getTime() - rcend.getTime()) / (1000*60*60))
    const contentPrefix = `最近 ${timeDiff}時間동안의 編輯現況입니다.`
    const contentSuffix = `寫眞: ${topPages[0][0]} ${topPageUrl}`
    const contentList = topPages.map(([name, diff]) => `* ${name} : +${diff}바이트`).join('\n')
    const content = `${contentPrefix}\n${contentList}\n\n${contentSuffix}`

    await tweet(content, screenshotData)
}

const main = async () => {
    const args = process.argv.slice(2)    
    await editSummary(buildProps(args))
}

if(require.main === module) {
    main()
}

module.exports = editSummary
