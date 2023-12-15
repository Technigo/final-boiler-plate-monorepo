import OpenAI from "openai";

const openai = new OpenAI({ key: process.env.OPENAI_API_KEY });

const generateText = async (req, res) => {
    const { prompt } = req.body
  try {
    const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        temperature: 0.5, // Adjust this value based on your preference. Lower values (e.g., 0.2) will make the output more deterministic and focused, potentially reducing token usage.
      });
    const answerText = response.choices[0].message.content
    console.log(answerText)

    res.status(200).json({
        success: true, 
        data: response,
        answer: answerText
    })
    
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "The text could not be generated",
    });
  }
};

module.exports = { generateText };


//******USING CHATGPT 3.5: ********
// const response = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant designed to output JSON.",
//       },
//       { role: "user", content: "Who won the peace nobel prize in 2018?" },
//     ],
//     model: "gpt-3.5-turbo-1106",
//     response_format: { type: "json_object" },
//   });


// const answerText = response.choices[0].message.content

//await openai.chat.completions.create(


// const response = await openai.completions.create({
//     model: "text-davinci-002",
//     prompt: ingredients,
//     temperature: 0.5, // Adjust this value based on your preference
//     max_tokens: 150, // Set a limit on the number of tokens in the response
// });
// const answerText = response.choices[0].text