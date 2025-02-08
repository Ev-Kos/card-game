import styles from './styles.module.css'

type TArrowBackButton = {
  color: string
}

export const ArrowBackButton: React.FC<TArrowBackButton> = ({ color }) => {
  return (
    <svg
      className={styles.arrowBackButton}
      xmlns="http://www.w3.org/2000/svg"
      width="72"
      height="23"
      viewBox="0 0 72 23"
      fill="none">
      <path
        d="M0.951356 9.92744C0.359009 10.5066 0.348309 11.4563 0.927457 12.0486L10.3653 21.7015C10.9444 22.2939 11.8941 22.3046 12.4864 21.7254C13.0788 21.1463 13.0895 20.1966 12.5103 19.6042L4.12119 11.0239L12.7015 2.63473C13.2939 2.05558 13.3046 1.1059 12.7254 0.513549C12.1463 -0.0788005 11.1966 -0.0895005 10.6042 0.48965L0.951356 9.92744ZM71.0129 10.2774L2.0169 9.50008L1.9831 12.4999L70.9791 13.2772L71.0129 10.2774Z"
        fill={color}
      />
    </svg>
  )
}
