import styles from './ContactUs.module.css';
import { Text } from '../UI/Typography';

export const ContactUs = () => {
    return (
        <div className={styles.wrapper} >
            <Text type="H1" className={styles.h1}>
                GET IN TOUCH
            </Text>
            <div className={styles.contactTextWrapper}>
                <Text type="H3" className={styles.h3}>
                    REACH OUT FOR ANY REASON
                </Text>

                <Text type="bodyText" className={styles.p}>
                    If you have questions, feedback, or just want to share your thoughts, we're all ears! The best way to get in touch is through Instagram, or you can email us directly at thiswillbeouremail@gmail.com.
                </Text>

                <Text type="H3" className={styles.h3}>
                    A NOTE ON CREATIVITY AND CREDIT
                </Text>

                <Text type="bodyText" className={styles.p}>
                    We're passionate about cocktails and creativity. While we always aim to credit the original creators of the recipes we're inspired by, sometimes the source of an idea isn't clear. If you recognize a recipe that lacks proper acknowledgement, please let us know. We're committed to respecting creative rights and will promptly address any oversight. Your input helps us honor the community's collective creativity and integrity.
                </Text>

                <Text type="bodyText" className={styles.p}>
                    Thank you for being part of our cocktail-loving world!
                </Text>
            </div>
        </div>)
}