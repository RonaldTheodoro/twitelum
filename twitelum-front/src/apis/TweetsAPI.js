export const carrega = () => {
  return (dispatch) => {
    const token = localStorage.getItem('TOKEN')

    fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`)
      .then((response) => response.json())
      .then((tweets) => dispatch({ type: 'CARREGA_TWEETS', tweets }))
  }
}


export const adiciona = (novoTweet) => {
  return (dispatch) => {
    const token = localStorage.getItem('TOKEN')

    if (novoTweet) {
      fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${token}`, {
        method: 'POST',
        body: JSON.stringify({ conteudo: novoTweet })
      }).then((response) => response.json())
        .then((tweet) => dispatch({ type: 'ADICIONA_TWEET', tweet }))
    }
  }
}


export const remove = (tweetId) => {
  return (dispatch) => {
    const token = localStorage.getItem('TOKEN')

    fetch(`http://localhost:3001/tweets/${tweetId}?X-AUTH-TOKEN=${token}`, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then(() => {
        dispatch({ type: 'REMOVE_TWEET', tweetId: tweetId })
        dispatch({ type: 'REMOVE_TWEET_ATIVO' })
      })
  }
}