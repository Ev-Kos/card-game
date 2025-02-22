import { screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { EndGame } from './end-game'
import { renderWithRouter } from '../../shared/utils/renderWithRouter'

describe('Тестирование экрана окончания игры', () => {
  it('При клике на кнопку "Новая игра" появляется экран BeforeGame', () => {
    renderWithRouter(
      <EndGame isPlayerWin={false} isNobodyWin={false} onClick={jest.fn()} />,
      { route: '/game' },
    )
    const button = screen.getByTestId('button-new-game')
    fireEvent.click(button)
    waitFor(() => {
      expect(screen.getByTestId('before-game')).toBeInTheDocument()
    })
  })

  it('При нажатии кнопки "Главное меню" появляется компонент "MainMenuPage"', () => {
    renderWithRouter(
      <EndGame isPlayerWin={false} isNobodyWin={false} onClick={jest.fn()} />,
      { route: '/game' },
    )
    const button = screen.getByTestId('button-menu')
    fireEvent.click(button)
    waitFor(() => {
      expect(screen.getByTestId('button-new-game')).toBeInTheDocument()
    })
  })
})
