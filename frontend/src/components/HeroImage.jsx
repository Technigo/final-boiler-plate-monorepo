import styles from '../styles/HeroImage.module.css'

export const HeroImage = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.textContainer}>
                    <h2>Helping dogs find their people</h2>
                </div>
            </div>
        </>
    )
}

export default HeroImage