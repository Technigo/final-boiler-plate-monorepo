import styles from '../styles/Footer.module.css'

export const Footer = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.textContainer}>
                    <h2>RESCUE HELPER</h2>
                    <div className={styles.infoContainer}>
                        <p>admin@rescuehelper.com</p>
                        <p>Technigo Web Development Boot Camp</p>
                        <p>ELIN OLAUSSON & OLGA LEPISTÖ 2024</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer