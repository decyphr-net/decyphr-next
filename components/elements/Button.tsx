import styles from './button.module.scss'

export function Button(props) {
  return (
    <button
      className={props.className
        ? `${styles.formButton} ${props.className}`
        : `${styles.formButton}`
      }
      onClick={props.onClickHandler}
    >
      {props.text}
    </button>
  )
}