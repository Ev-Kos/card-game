import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './shared/store/store'

export const render = () =>
  renderToString(
    <div>ggggg</div>,
    //     <StrictMode>
    //     <BrowserRouter>
    //       <Provider store={store}>
    //         <App />
    //       </Provider>
    //     </BrowserRouter>
    //   </StrictMode>
  )
