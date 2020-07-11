import styles from './button.module.scss'

export function Button(props) {
  return (
    <button
      className={props.className
        ? `${styles.formButton} ${props.className}`
        : `${styles.formButton}`
      }
      value={props.value
        ? `${props.value}`
        : ''
      }

      onClick={e => props.onClickHandler(e)}
    >
      {props.text}
    </button>
  )
}