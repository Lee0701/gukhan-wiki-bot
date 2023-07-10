
require('dotenv').config()
const { TwitterApi, EUploadMimeType }  = require('twitter-api-v2')

const client = new TwitterApi({
    appKey: process.env.CONSUMER_KEY,
    appSecret: process.env.CONSUMER_SECRET,
    accessToken: process.env.ACCESS_TOKEN_KEY,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
})

const tweet = async (content, media) => {
    if(!media) media = []
    else if(typeof media === 'string') media = [media]
    const media_ids = await Promise.all(media.map(async (m) => {
        const media_id = await client.v1.uploadMedia(Buffer.from(m, 'base64'), {mimeType: EUploadMimeType.Webp})
        return media_id
    }))

    const result = await client.v2.tweet(content, {media: {media_ids}})
    return result
}

module.exports = tweet
