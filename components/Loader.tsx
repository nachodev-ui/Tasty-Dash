import styles from '../styles/Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.dot2}></div>
      <div className={styles.dot1}></div>
    </div>
  )
}

export default Loader
