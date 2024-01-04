import React from 'react';
import useNewsletterStore from '../stores/newsletterStore';
import { SubHeadingComponent } from './SubHeadingComponent';
import { ParagraphComponent } from './ParagraphComponent';
import { BtnComponent } from './BtnComonent';
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
                {/* The entire newsletter content */}
                <div className='w-auto m-4 lg:m-8 py-12 text-black bg-customPink px-4 rounded-md'>
                    <div className='grid lg:grid-cols-1 lg:text-center'>
                        <div>
                            <SubHeadingComponent className='sm:text-left' text="Want to know the latest news about Tuanis Surf School?" />
                            <ParagraphComponent text="Sign up for our newsletter and stay up to date." />
                        </div>
                        <div className='lg:my-4'>
                            <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                                <input
                                    className='p-3 flex w-full rounded-md text-black'
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <BtnComponent
                                    className='bg-amber-300 mt-2 text-pink-500 px-5 ml-5 whitespace-nowrap'
                                    onClick={handleSubscribe}
                                    label={isLoading ? 'Subscribing...' : 'Sign up'}
                                />
                            </div>
                            {successMessage && (
                                <ParagraphComponent text={successMessage} className='text-green-500' />
                            )}
                            {errorMessage && (
                                <ParagraphComponent text={errorMessage} className='text-red-500' />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}
