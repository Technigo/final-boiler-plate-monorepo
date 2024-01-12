import useNewsletterStore from '../../stores/newsletterStore';
import { SubHeadingComponent } from '../Reusables/SubHeadingComponent';
import { ParagraphComponent } from '../Reusables/ParagraphComponent';
import { BtnComponent } from '../Reusables/BtnComonent';
import { Fade } from "react-awesome-reveal";

export const PostNewsletter = () => {
    const {
        email,
        isLoading,
        successMessage,
        errorMessage,
        setEmail,
        subscribeNewsletter,
        resetState,
    } = useNewsletterStore();

    const handleSubscribe = async () => {
        await subscribeNewsletter();
    };

    return (
        <Fade>
            <div className='w-full h-full flex items-center justify-center'>
                <div className='w-auto lg:m-8 py-12 rounded-md border-4 border-customPink px-2 md:px-10'>
                    <div className='grid lg:grid-cols-1 text-left md:text-center'>
                        <div>
                            <SubHeadingComponent text="Want to know the latest news about Tuanis Surf School?" />
                            <ParagraphComponent className="px-4 pb-4" text="Sign up for our newsletter and stay up to date." />
                        </div>
                        <div className='lg:my-4'>
                            <div className='flex flex-col sm:flex-row items-center justify-between w-full px-4'>
                                <input
                                    type="email"
                                    name="user_email"
                                    className='p-3 flex w-full rounded-md text-black'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <BtnComponent
                                    type="submit"
                                    className={`bg-amber-300 my-4 text-pink-500 px-5 ml-5 whitespace-nowrap ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleSubscribe}
                                    label={isLoading ? 'Subscribing...' : 'Sign up'}
                                />
                            </div>
                            {successMessage ? (
                                <ParagraphComponent text={successMessage} className='text-green-500' />
                            ) : (
                                errorMessage && <ParagraphComponent text={errorMessage} className='text-red-500' />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};