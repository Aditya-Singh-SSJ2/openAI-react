import './App.css';
import {useState} from "react";
import OpenAI from "openai";
console.log(process.env.REACT_APP_MY_API_KEY)
// import {Configuration, openAIApi} from "openai";


const openai = new OpenAI({ apiKey: "<my-api-key>", dangerouslyAllowBrowser: true });

function App() {

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");


  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_MY_API_KEY,
  // });
  // const openai = new openAIApi(configuration);

  async function fetchData() {
    try{
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "a white siamese cat",
        n: 1,
        size: "1024x1024",
      });
      var image_url = response.data[0].url;
      console.log(image_url)
    } catch(e){
      console.log(e);
    }
  }

  return (
    <div className="App">
      <h1>Image Generator</h1>
      <button onClick={fetchData}>Generate</button>
    </div>
  );
}

export default App;
