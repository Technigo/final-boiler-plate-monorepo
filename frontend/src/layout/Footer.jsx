import styles from './Footer.module.css';
import { InstagramButton } from '../UI/InstagramButton';

export const Footer = () => {
    return (<div className={styles.wrapper}>
        <InstagramButton />
    </div>)
}