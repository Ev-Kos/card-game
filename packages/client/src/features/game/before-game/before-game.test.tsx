import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import MainMenuPage from '../../../pages/main-menu-page'
import { BrowserRouter } from 'react-router-dom'
import { BeforeGame } from './before-game'
import '@testing-library/jest-dom'

describe('Тестирование начального экрана игры', () => {
  it('При нажатии в меню кнопки "Новая игра" компонент "BeforeGame" появляется', () => {
    render(
      <BrowserRouter>
        <MainMenuPage />
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

  it('При нажатии кнопки "Начать игру" появляется компонент "Game"', () => {
    render(
      <BrowserRouter>
        <BeforeGame
          onClickStart={jest.fn()}
          setBackgroudBoard={jest.fn()}
          setShirtCard={jest.fn()}
        />
      </BrowserRouter>,
    )
    const button = screen.getByTestId('button-start-game')
    fireEvent.click(button)
    waitFor(
      () => {
        expect(screen.getByTestId('game')).toBeInTheDocument()
      },
      { timeout: 500 },
    )
  })

  it('По клику на кнопку "Правила" открывается компонент "RulesOfGame" и закрывается по клику на крестик', () => {
    render(
      <BrowserRouter>
        <BeforeGame
          onClickStart={jest.fn()}
          setBackgroudBoard={jest.fn()}
          setShirtCard={jest.fn()}
        />
      </BrowserRouter>,
    )
    const button = screen.getByTestId('button-rules')
    fireEvent.click(button)
    waitFor(() => {
      expect(screen.getByTestId('rules')).toBeInTheDocument()
      const button = screen.getByTestId('button-close-rules')
      fireEvent.click(button)
      expect(screen.getByTestId('rules')).not.toBeInTheDocument()
    })
  })

  it('По клику на кнопку "Настройки" открывается компонент "ToolesGame" и закрывается по клику на кнопку "Ок"', () => {
    render(
      <BrowserRouter>
        <BeforeGame
          onClickStart={jest.fn()}
          setBackgroudBoard={jest.fn()}
          setShirtCard={jest.fn()}
        />
      </BrowserRouter>,
    )
    const button = screen.getByTestId('button-tools')
    fireEvent.click(button)
    waitFor(() => {
      expect(screen.getByTestId('tools')).toBeInTheDocument()
      const button = screen.getByTestId('button-submit-tools')
      fireEvent.click(button)
      expect(screen.getByTestId('tools')).not.toBeInTheDocument()
    })
  })
})
