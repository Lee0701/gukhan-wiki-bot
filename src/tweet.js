
require('dotenv').config()
const Twitter = require('twitter')

const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const tweet = async (content, media) => {
    if(!media) media = []
    else if(typeof media === 'string') media = [media]
    const media_ids = await Promise.all(media.map(async (m) => {
        const data = {
            media_category: 'tweet_image',
            media_data: m,
        }
        const response = await client.post('media/upload', data)
        const media_id = response['media_id_string']
        return media_id
    }))

    const result = await client.post('statuses/update', {
        status: content,
        media_ids: media_ids.join(','),
    })
    return result
}

module.exports = tweet
