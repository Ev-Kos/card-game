import type React from 'react'

import styles from './styles.module.css'

export type TLinkProps = {
  label?: string
} & React.LinkHTMLAttributes<HTMLElement>

export const Link = ({ label, children, ...props }: TLinkProps) => {
  return (
    <div className={styles.linkContainer}>
      {label && <p className={styles.label}>{label}</p>}
      <a className={styles.link} {...props}>
        {children}
      </a>
    </div>
  )
}
