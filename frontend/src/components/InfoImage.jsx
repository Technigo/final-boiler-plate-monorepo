import styles from '../styles/InfoImage.module.css'
import { Link } from 'react-router-dom'

export const InfoImage = () => {
    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.textContainer}>
                    <h3>Rescue Helper is a non-profit organization that wants to make adopting a rescue dog more accessible.</h3>
                    <h3>Shelters can list their available dogs in our database, providing a comprehensive and easy-to-use interface 
                        for anyone interested in adopting a rescue dog.
                    </h3>
                    <Link to="/aboutUs" className={styles.navLink}><h3>READ OUR STORY</h3></Link>
                </div>
            </div>
        </>
    )
}