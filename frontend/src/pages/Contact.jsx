export const Contact = () => {
  return (
    <div
      className="text-center text-primary
      font-bold
      left-0 h-screen w-50 m-0
      flex flex-col
      bg-secondary
      space-y-4
      justify-center">
      Email us:
      <a
        href="mailto:info@piggyback.com"
        className="text-green-900 hover:underline ">
        <i>info@piggyback.com</i>
      </a>
      <div className="flex space-x-2 justify-center">
        <p>Follow us</p>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline">
          Facebook
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline">
          Linkedin
        </a>
        {/* Add links for other social media platforms as needed */}
      </div>
      <i>Call us: 126 555 78</i>
    </div>
  );
};
