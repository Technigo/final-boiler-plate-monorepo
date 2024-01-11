
export const MethodDetails = ({ instructions }) => {
  return (
    <>
      <h3>Method</h3>
      <ol>
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </>
  )
}

