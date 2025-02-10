import { useNavigate } from 'react-router-dom'

import { Button } from '..'

import type { TButtonProps } from '../button/button'

type TButtonLinkProps = {
  to: string
} & TButtonProps

export const ButtonLink = ({ to, children, ...props }: TButtonLinkProps) => {
  const navigate = useNavigate()

  return (
    <Button {...props} onClick={() => navigate(to)}>
      {children}
    </Button>
  )
}
