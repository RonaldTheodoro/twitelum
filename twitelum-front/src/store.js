import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = { lista: [], tweetAtivo: {} }, action = {}) {
  if (action.type === 'CARREGA_TWEETS')
    return { ...state, lista: action.tweets }

  if (action.type === 'ADICIONA_TWEET')
    return { ...state, lista: [action.tweet, ...state.lista] }

  if (action.type === 'REMOVE_TWEET') {
    const tweetLista = state.lista.filter(
      (tweet) => tweet._id !== action.tweetId
    )
    return { ...state, lista: tweetLista }
  }

  if (action.type === 'ADD_TWEET_ATIVO') {
    const tweetAtivo = state.lista.find(tweet => tweet._id === action.tweetId)
    return { ...state, tweetAtivo }
  }

  if (action.type === 'REMOVE_TWEET_ATIVO')
    return { ...state, tweetAtivo: {} }

  if (action.type === 'LIKE') {
    const tweetAtualizado = state.lista.map((tweet) => {
      if (tweet._id === action.tweetId) {
        const { likeado, totalLikes } = tweet
        tweet.likeado = !likeado
        tweet.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1
      }
      return tweet
    })
    return { ...state, lista: tweetAtualizado }
  }
  return state
}

const store = createStore(tweetsReducer, applyMiddleware(thunk))

export default store
