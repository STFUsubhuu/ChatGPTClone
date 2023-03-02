import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config()
const port = process.env.PORT || 4000

const app = express();
app.use(cors())
app.use(express.json());

app.get("/", async(req, res) => {
    res.status(200).send({
        message : "Hey Chatty here"
    })
})


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


app.post("/", async(req, res) => {
    try{
        // model we selected we know , prompt: basically the compose bar text, temperature: kitna accurate ans chaiye. 0 means 100% accurate
        // max tokens means  kitna charac k ans dega apka ai so i make it 4000
        //
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.input,
            temperature: 0,
            max_tokens: 4000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
        console.log("PASSED:", req.body.input);
          res.status(200).send({
            bot : response.data.choices[0].text
          })

    } catch(err) {
        console.log("FAILED:", req.body.input);
        console.error(err)
        res.status(500).send(err)
    }
})

app.listen(port, ()=> {
    console.log("server is running bro!");
})
