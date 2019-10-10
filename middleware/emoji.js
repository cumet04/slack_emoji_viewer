const axios = require('axios')

export default function({ store }) {
  // const source = slack_get()
  const source = mock_get()
  return source.then(res => {
    store.commit('emoji/set', res.data.emoji)
  })
}

function slack_get() {
  const max_count = 2000
  return axios.post(
    'https://oro.slack.com/api/emoji.adminList',
    [`token=${process.env.SLACK_TOKEN}`, `count=${max_count}`].join('&')
  )
}

function mock_get() {
  return axios.get('http://localhost:3000/_dummy_emojis')
}
