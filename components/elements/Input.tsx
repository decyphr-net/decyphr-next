import styles from './input.module.scss'

export function TextInput({ placeholder, name, label, type, onChangeHandler }) {
  return (
    <input
      className={styles.formInput}
      placeholder={placeholder}
      aria-label={label}
      name={name}
      type={type}
      onChange={e => onChangeHandler(e.target.value)}
    />
  )
}

export function SelectInput({ placeholder, label, dataset, onChangeHandler }) {
  return (
    <select className={styles.formInput} onChange={e => onChangeHandler(e.target.value)} aria-label={label}>
      <option value="" selected disabled hidden>{placeholder}</option>
      {dataset.map((data, index) => {
        return <option key={index} value={data.id}>{data.name}</option>
      })}
    </select>
  )
}