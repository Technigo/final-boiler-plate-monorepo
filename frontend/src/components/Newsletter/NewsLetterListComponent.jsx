import React, { useEffect, useState } from 'react';
import useNewsletterStore from '../../stores/newsletterStore';
import { BtnComponent } from '../Reusables/BtnComonent';
import { ParagraphComponent } from '../Reusables/ParagraphComponent';

export const NewsLetterListComponent = () => {
    const { subscribersNewsletter, newsletter, handleDeleteNewsletter, set, errorMessage } = useNewsletterStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                setLoading(true);
                const response = await subscribersNewsletter();

                if (response.ok) {
                    const data = await response.json();
                    // Update the newsletter state using the set function
                    set((state) => ({ ...state, newsletter: data }));
                } else {
                    // Handle the case where the response is not ok
                    set((state) => ({ ...state, errorMessage: 'Failed to fetch subscribers' }));
                }
            } catch (error) {
                // Handle any errors that occur during the fetch
                set((state) => ({ ...state, errorMessage: `Error fetching subscribers: ${error.message}` }));
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, [subscribersNewsletter, set]); // Add set to the dependency array

    const handleCopy = () => {
        const emailsToCopy = newsletter.map((subscriber) => subscriber.email).join('\n');

        navigator.clipboard.writeText(emailsToCopy)
            .then(() => {
                alert('Emails copied to clipboard');
            })
            .catch((error) => {
                // Handle clipboard copy error
                alert('Error copying to clipboard:', error);
            });
    };

    return (
        <div className='h-screen flex flex-col items-center mx-10'>

            <BtnComponent className='mx-6 bg-gray-800 m-1 hover:bg-gray-600 text-white' onClick={handleCopy} label="Copy all emails" />

            {loading && <p>Loading...</p>}
            {errorMessage && <ParagraphComponent text={`Error: ${errorMessage}`} />}
            {!loading && newsletter.length === 0 && <ParagraphComponent text="No subscribers found" />}
            {!loading && newsletter.length > 0 && (
                <div>
                    {newsletter.map((subscriber) => (
                        <div key={subscriber._id} className="mb-4">

                            <span className=''>{subscriber.email}</span>

                            <BtnComponent className=' bg-gray-800 m-1 hover:bg-gray-600 text-white sm:block' onClick={() => handleDeleteNewsletter(subscriber._id)} label="Delete" />

                        </div>
                    ))}

                </div>

            )}
        </div>
    );
}