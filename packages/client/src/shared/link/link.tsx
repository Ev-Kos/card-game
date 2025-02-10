import { NavLink } from 'react-router-dom'

import type { NavLinkProps } from 'react-router-dom'

import styles from './styles.module.css'

export type TLinkProps = {
  label?: string
} & NavLinkProps

export const Link = ({ label, children, ...props }: TLinkProps) => {
  return (
    <div className={styles.linkContainer}>
      {label && <p className={styles.label}>{label}</p>}
      <NavLink className={styles.link} {...props}>
        {children}
      </NavLink>
    </div>
  )
}
