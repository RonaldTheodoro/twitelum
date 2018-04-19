import { connect } from 'react-redux'
import Tweet from '../components/Tweet'
import * as TweetAPI from '../apis/TweetsAPI'


const mapDispatchToProps = (dispatch, propsRecebidas) => {
  return {
    removeHandler: () => {
      dispatch(TweetAPI.remove(propsRecebidas.tweetInfo._id))
    },
    handleLike: () => {
      dispatch(TweetAPI.like(propsRecebidas.tweetInfo._id))
    }
  }
}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer


/*
Connect na mão sem ajuda da lib
class TweetPadrao extends Component {
  removeHandler() { store.dispatch(TweetAPI.remove()) }
  render() {
    return (
      <Tweet />
    )
  }
}
*/