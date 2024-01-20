import { Text } from '../UI/Typography';
import styles from './AboutUs.module.css';
import { BackButton } from '../UI/BackToButton';

export const AboutUs = () => {
    return (
        <div className={styles.wrapper}>
            <Text type="H1" className={styles.h1}>ABOUT US</Text>
            <img src="/images/bruun.PNG" className={styles.imgBruun} alt="Picture of Eva" />
            <img src="/images/mima.PNG" className={styles.imgMima} alt="Picture of Mirela" />
            <div className={styles.membersBruun}>
                <Text type="SbodyText" className={styles.Bruun}>Eva<br />
                    <span role="img" aria-label="Cocktail Glass">🍹</span> Favorite cocktail: Mojito<br />
                    <span role="img" aria-label="Party Popper">🎉</span> Hobby: Answer<br />
                    <span role="img" aria-label="Suitcase">🧳</span> Favorite destination: Answer<br />
                    <span role="img" aria-label="Writing Hand">✍️</span> About me: Answer<br />
                </Text>
            </div>
            <div className={styles.membersMima}>
                <Text type="SbodyText" className={styles.Mima}>Mirela<br />
                    <span role="img" aria-label="Cocktail Glass">🍹</span> Favorite cocktail: Espresso Martini<br />
                    <span role="img" aria-label="Party Popper">🎉</span> Hobby: Answer<br />
                    <span role="img" aria-label="Suitcase">🧳</span> Favorite destination: Answer<br />
                    <span role="img" aria-label="Writing Hand">✍️</span> About me: Answer<br />
                </Text>
            </div>
            <img src="/images/fulba.PNG" className={styles.imgFulba} alt="Picture of Elba" />
            <img src="/images/inemy.PNG" className={styles.imgInemy} alt="Picture of Ine" />
            <div className={styles.membersFulba}>
                <Text type="SbodyText" className={styles.fulba}>Elba<br />
                    <span role="img" aria-label="Cocktail Glass">🍹</span> Favorite cocktail: Negroni<br />
                    <span role="img" aria-label="Party Popper">🎉</span> Hobby: Answer<br />
                    <span role="img" aria-label="Suitcase">🧳</span> Favorite destination: Colombia & Croatia<br />
                    <span role="img" aria-label="Writing Hand">✍️</span> About me: Answer<br />
                </Text>
            </div>
            <div className={styles.membersIneMy}>
                <Text type="SbodyText" className={styles.IneMy}>Ine<br />
                    <span role="img" aria-label="Cocktail Glass">🍹</span> Favorite cocktail: Margarita<br />
                    <span role="img" aria-label="Party Popper">🎉</span> Hobby: Answer<br />
                    <span role="img" aria-label="Suitcase">🧳</span> Favorite destination: Answer<br />
                    <span role="img" aria-label="Writing Hand">✍️</span> About me: Answer<br />
                </Text>
            </div>
            <Text type="H1" className={styles.h1}>ABOUT CARL BERNER COCTAILKLUBB</Text>
            <div className={styles.AboutusText}>
                <Text type="bodyText" className={styles.p}>
                    We are a group of friends, all living in Oslo, who share a common interest in cocktails. Our journey began with a simple desire: to share our personal favorite drinks with each other. What started as a casual gathering of friends with a shared interest has grown into a regular tradition. We meet every other month, and sometimes more often, to explore the art of cocktail making, each time with a new and exciting theme in focus.
                </Text>
                <Text type="bodyText" className={styles.p}>
                    On these evenings, each of us brings our own signature drink. We taste each other's creations, discuss recipes and techniques, and share tips and tricks. Our get-togethers are a great opportunity to try new things and expand our understanding of the cocktail world, from traditional classics to our own innovative blends. </Text>
                <Text type="bodyText" className={styles.p}>
                    We also document our cocktail adventures on Instagram. Here we share not just photos and stories from our meetings but also drinks we make between gatherings. </Text>
                <Text type="bodyText" className={styles.p}>
                    Whether you're an experienced cocktail enthusiast or a curious beginner, we welcome you. Keep up with our activities, feel free to comment, contribute ideas, or give feedback on our drinks - we appreciate all interaction! </Text>
                <Text type="bodyText" className={styles.p}>
                    Follow us on Instagram to get a glimpse into our world of cocktails. Take a look around our page for inspiration and ideas for your next drink experience. </Text>
            </div>
            <div className={styles.BackToButton}>
                <BackButton />
            </div>
        </div>
    );
};

export default AboutUs;

