

export const AdCard = ({ ad }) => {
  return (
    <div className="ad-card">
      <h2>{ad.title}</h2>
      <p>Description: {ad.description}</p>
      <p>Product: {ad.product}</p>
      <p>Amount: {ad.amount}</p>
      <p>Unit: {ad.unit}</p>
      <p>Address: {ad.address}</p>
      <p>Pick-up time: {ad.pickUpTime}</p>
      <p>Advertiser: {ad.advertiser}</p>
    </div>
  )
}
