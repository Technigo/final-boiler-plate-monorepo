import styles from './Footer.module.css';
import { Text } from '../UI/Typography';

export const Footer = () => {
    return (<div className={styles.wrapper}>
        <Text type="bodyText" className={styles.p}>
            This is the footer
        </Text>
    </div>)
}