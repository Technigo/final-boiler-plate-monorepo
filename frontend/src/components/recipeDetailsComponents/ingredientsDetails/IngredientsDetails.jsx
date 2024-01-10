

export const IngredientsDetails = ({ ingredients }) => {

  // Function to capitalise the first letter of a word in object
  const capitalizeKeys = (obj) => {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        newObj[capitalizedKey] = obj[key];
      }
    }
    return newObj;
  };
  return (
    <>
      <h3>Ingredients</h3>
      <ul>
        {Object.entries(capitalizeKeys(ingredients)).map(
          ([ingredient, quantity], i) => (
            <li key={i}>{`${ingredient}: ${quantity}`}</li>
          )
        )}
      </ul>
    </>
  )
}
