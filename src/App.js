import './App.css';
import {useState} from "react";
import OpenAI from "openai";
console.log(process.env.REACT_APP_MY_API_KEY)
// import {Configuration, openAIApi} from "openai";


const openai = new OpenAI({ apiKey: process.env.REACT_APP_MY_API_KEY, dangerouslyAllowBrowser: true});

function App() {

  const [image, setImage] = useState("https://ih1.redbubble.net/image.4579248323.2051/gbrf,6x6,f,540x540-pad,450x450,f8f8f8.jpg");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");


  // const configuration = new Configuration({
  //   apiKey: process.env.REACT_APP_MY_API_KEY,
  // });
  // const openai = new openAIApi(configuration);

  async function fetchData() {
    try{
      setIsLoading(true);
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      var image_url = response.data[0].url;
      console.log(image_url)
      setIsLoading(false);
    } catch(e){
      console.log(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Image Generator</h1>
      <div>
        {isLoading ? (
          <p> Loading... </p>
          ):(
          <img src={image}/>
        )}
      </div>
      <input onChange={(e) => setPrompt(e.target.value)} placeholder='enter your propmt'/>
      <button onClick={fetchData}>Generate</button>
    </div>
  );
}

export default App;
