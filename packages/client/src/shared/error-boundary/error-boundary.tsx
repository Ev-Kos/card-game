import { Component, ReactNode, ErrorInfo } from 'react'
import { Error } from '../../entities/error'
import styles from './styles.module.css'

type TErrorBoundaryProps = {
  children: ReactNode
}

type TState = {
  hasError: boolean
}

class ErrorBoundary extends Component<TErrorBoundaryProps, TState> {
  constructor(props: TErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): TState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Error
          description="что-то тут не так!"
          text="Попробуйте перегрузить страницу">
          <h1 className={styles.errorTitle}>Ой :(</h1>
        </Error>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
