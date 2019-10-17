const axios = require('axios')

function slack_get() {
  const max_count = 2000
  return axios.post(
    'https://slack.com/api/emoji.adminList',
    [`token=${process.env.SLACK_TOKEN}`, `count=${max_count}`].join('&')
  )
}

function mock_get() {
  return axios.get('http://localhost:3000/_dummy_emojis')
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    // const source = slack_get()
    const source = mock_get()
    return source.then(res => {
      commit('emoji/set_all', res.data.emoji)
    })
  }
}
