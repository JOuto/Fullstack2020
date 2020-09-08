import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
//import reducer from './reducers/anecdoteReducer'
import storeCreator from "./components/store"


const store = storeCreator

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)