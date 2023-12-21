export const AdCard = ({ ad }) => {
  console.log(ad); // Debug: Log the ad object

  return (
    <div style={{ display: "flex", flexDirection: "column", border: '1px solid #ddd', padding: '10px', margin: '10px', width: "250px" }}> {/* can take this away */}
      <img src={ad.image} alt={`${ad.title}`} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
      <h3>{ad.title}</h3>
      <p>Posted by: {ad.user.username || 'Unknown'}</p>
    </div>
  );
};
  
