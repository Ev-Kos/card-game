import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { EndGame } from './end-game'

describe('Тестирование экрана окончания игры', () => {
  it('При клике на кнопку "Новая игра" появляется экран BeforeGame', () => {
    render(
      <BrowserRouter>
        <EndGame isPlayerWin={false} isNobodyWin={false} onClick={jest.fn()} />
      </BrowserRouter>,
    )
    const button = screen.getByTestId('button-new-game')
    fireEvent.click(button)
    waitFor(
      () => {
        expect(screen.getByTestId('before-game')).toBeInTheDocument()
      },
      { timeout: 500 },
    )
  })

  it('При нажатии кнопки "Главное меню" появляется компонент "MainMenuPage"', () => {
    render(
      <BrowserRouter>
        <EndGame isPlayerWin={false} isNobodyWin={false} onClick={jest.fn()} />
      </BrowserRouter>,
    )
    const button = screen.getByTestId('button-menu')
    fireEvent.click(button)
    waitFor(
      () => {
        expect(screen.getByTestId('button-new-game')).toBeInTheDocument()
      },
      { timeout: 500 },
    )
  })
})
