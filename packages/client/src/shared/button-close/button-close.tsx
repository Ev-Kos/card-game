import styles from './styles.module.css'
import classNames from 'classnames'

type TButtonProps = {
  color?: 'secondary' | 'contrast'
  positionTop: string
  positionRight: string
} & React.HTMLAttributes<HTMLButtonElement>

export const ButtonClose = ({
  color = 'secondary',
  ...props
}: TButtonProps) => {
  const className = classNames(styles.button, styles[`button-${color}`])

  return (
    <button className={className} {...props}>
      <svg
        width="35px"
        height="35px"
        viewBox="0 0 1024 1024"
        fill="currentColor">
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path
            fill="currentColor"
            d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 
              512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 
              512 195.2 285.696a64 64 0 0 1 0-90.496z"></path>
        </g>
      </svg>
    </button>
  )
}
