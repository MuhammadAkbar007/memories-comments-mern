import { combineReducers } from 'redux'

import posts from './postsReducers'
import authReducers from './authReducers'

export default combineReducers({ posts, authReducers })
// export default combineReducers({ posts })

// export const reducers = combineReducers({ posts, authReducers })