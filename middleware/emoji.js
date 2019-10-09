const axios = require('axios')

export default function({ store }) {
  const max_count = 2000
  return axios
    .post(
      'https://oro.slack.com/api/emoji.adminList',
      [`token=${process.env.SLACK_TOKEN}`, `count=${max_count}`].join('&')
    )
    .then(res => {
      store.commit('emoji/set', res.data.emoji)
    })
}
