import { FC, InputHTMLAttributes } from 'react'

type TInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className: string
}

export const Input: FC<TInputProps> = ({ className, ...props }) => {
  return <input className={className} {...props} />
}
