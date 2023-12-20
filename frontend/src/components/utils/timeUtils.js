export const timeSince = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000; // Calculate years

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000; // Calculate months
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400; // Calculate days
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600; // Calculate hours
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60; // Calculate minutes
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago"; // Calculate seconds
};
