import "./methodDetails.css"

export const MethodDetails = ({instructions}) => {
  return (
    <>
     <h3>Method</h3>
     {console.log(instructions)}
        <ol>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
    </>
  )
}

