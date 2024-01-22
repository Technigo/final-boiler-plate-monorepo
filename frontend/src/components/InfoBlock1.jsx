import styles from '../styles/InfoBlock.module.css'
import { Link } from 'react-router-dom'

export const InfoBlock1 = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <h3 className={styles.whiteText}>Are you looking to adopt a rescue dog?</h3>
                <h3 className={styles.greenText}>CLICK 
                <Link to="/dogsearch" className={styles.navLink}> HERE </Link>
                TO SEARCH FOR DOGS</h3>
            </div>
        </>
    )
}

export default InfoBlock1