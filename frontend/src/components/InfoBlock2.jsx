import styles from '../styles/InfoBlock.module.css'

export const InfoBlock2 = () => {
    return (
        <>
        <div className={styles.mainContainer}>
            <h3 className={styles.whiteText}>Are you representing a dog adoption organisation?</h3>
            <h3 className={styles.whiteText}>E-mail us at <h3 className={styles.greenText}>admin@rescuehelper.com</h3></h3>
        </div>
        </>
    )
}