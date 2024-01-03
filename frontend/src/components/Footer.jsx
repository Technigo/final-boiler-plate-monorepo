import styles from '../styles/Footer.module.css'

export const Footer = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.textContainer}>
                    <h2>RESCUE HELPER</h2>
                    <p>admin@rescuehelper.com</p>
                    <p>Final project @ Technigo Web Development Boot Camp</p>
                    <p>ELIN OLAUSSON & OLGA LEPISTÖ 2023</p>
                </div>
            </div>
        </>
    )
}

export default Footer