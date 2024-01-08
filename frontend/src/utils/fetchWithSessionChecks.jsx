const fetchWithSessionChecks = async (url, options, onSessionExpire) => {
    const response = await fetch(url, options);
  
    if (response.status === 401) {
      onSessionExpire(); // Call the function to handle session expiration
      throw new Error('Session expired');
    }
  
    return response;
  };
  
  export default fetchWithSessionChecks;