import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Game from './components/Game'
import { createStore, combineReducers } from './store/willux'
import { changeSquares, changePlayer } from './reducers/index'

import registerServiceWorker from './registerServiceWorker';
import './app.css'

const finalReducer = combineReducers({
  squares: changeSquares,
  currentPlayer: changePlayer,
})

const store = createStore(finalReducer)

//console.log(store.getState(),'ttttt')

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>, document.getElementById('root'))


registerServiceWorker();


