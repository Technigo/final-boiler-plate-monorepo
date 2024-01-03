import styles from '../styles/InfoBlock.module.css'

export const InfoBlock1 = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <h3 className={styles.whiteText}>Are you looking to adopt a rescue dog?</h3>
                <h3 className={styles.greenText}>CLICK HERE TO SEARCH FOR DOGS</h3>
            </div>
        </>
    )
}

export default InfoBlock1