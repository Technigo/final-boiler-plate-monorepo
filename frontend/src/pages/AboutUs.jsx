import { Header } from '../components/Header.jsx'
import { NavBar } from '../components/NavBar.jsx'
import { Footer } from '../components/Footer.jsx'
import styles from '../styles/AboutUs.module.css'

export const AboutUs = () => {
    return (
        <>
            <div className={styles.siteContainer}>
                <div className={styles.mainContainer}>
                    <div className={styles.headingContainer}>
                        <Header />
                        <NavBar />
                    </div>
                    <div className={styles.headerImage}>
                        <h2>ABOUT US</h2>
                    </div>
                    <div className={styles.textWrapper}>
                        <h3>OUR STORY</h3>

                        <h4>Welcome to Rescue Helper: A Beacon for Furry Hearts </h4>
<p>
In the quiet corners of our world, where wagging tails meet hopeful eyes, Rescue Helper was born out of a shared passion for a simple belief: every dog deserves a chance at a loving home. Our journey began with the collective dream of making a difference in the lives of those who couldn't speak for themselves - the countless dogs abandoned, forgotten, and yearning for a second chance.

As avid animal lovers, we witnessed the tireless efforts of local dog rescue organizations committed to rescuing and rehabilitating dogs from various challenging situations. Yet, despite their dedication, a significant challenge remained: finding these deserving dogs their forever families.

Rescue Helper emerged as a beacon of compassion, bridging the gap between rescue organizations and loving homes. Our story is interwoven with the stories of countless four-legged companions, each with its own tale of resilience and hope.
</p>

<h4> The Seed of Compassion </h4>

<p>It all began with a chance encounter between a few like-minded individuals who shared a deep bond with their furry friends. Struck by the plight of homeless and abandoned dogs, they decided to channel their collective passion into a purpose greater than themselves. Thus, Paws of Hope took root - a seed of compassion that would blossom into a haven for those who couldn't find their voice. </p>

<h4>Empowering the Rescuers </h4>

<p>At Rescue Helper, we recognize the unsung heroes - the dog rescue organizations that work tirelessly day in and day out to save lives. We understand the challenges they face in finding suitable homes for their rescued dogs. Our mission became clear: empower these organizations by providing them with the support and resources needed to connect their canine companions with families eager to open their hearts and homes. </p>

<h4>Every Wag Tells a Tale</h4>

<p>In the heart of our organization lies the belief that every wagging tail tells a tale of triumph over adversity. Each dog we help find a home becomes a living testament to the power of compassion and second chances. We celebrate not only the joy of new beginnings for our furry friends but also the profound impact these adoptions have on the lives of the families who welcome them into their homes.

Join Us on the Journey

As you explore Rescue Helper, we invite you to become part of our story. Whether you're a dog lover looking to adopt, a rescue organization seeking support, or an advocate for animal welfare, your involvement makes a difference. Together, we can turn the page for more dogs, creating a world where every paw finds its path to love and happiness.

Thank you for being a part of our journey and for helping us create a legacy of hope, compassion, and endless tail wags.

With gratitude,

The Rescue Helper Team</p>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default AboutUs