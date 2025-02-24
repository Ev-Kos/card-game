import { render } from '@testing-library/react'
import { PropsWithChildren, ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../store/store'

export const renderWithRouter = (ui: ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper }),
  }
}
