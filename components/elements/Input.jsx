import styles from './input.module.scss'

export function TextField({ type, name,  placeholder, updateState }) {
  return <input className={styles.input} placeholder={placeholder} name={name} type={type} onChange={updateState} />
}