import styles from '../styles/InfoImage.module.css'

export const InfoImage = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.textContainer}>
                    <h3>Rescue Helper is a non-profit organization that wants to make adopting a rescue dog more accessible.</h3>
                    <h3>Over 1000 dogs have found their forever homes through us.</h3>
                </div>
            </div>
        </>
    )
}