import type React from 'react'

import styles from './styles.module.css'

export type TLinkProps = {
  label?: string
} & React.LinkHTMLAttributes<HTMLInputElement>

export const Link = ({ label, href, children }: TLinkProps) => {
  return (
    <div className={styles.linkContainer}>
      {label && <p className={styles.label}>{label}</p>}
      <a href={href} className={styles.link}>
        {children}
      </a>
    </div>
  )
}
