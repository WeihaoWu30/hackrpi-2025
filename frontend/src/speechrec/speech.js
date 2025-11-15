import { AssemblyAI } from "assemblyai";
import { Readable} from "stream";
import recorder from "node-record-lpcm16";

const run = async() => {
   const client = new AssemblyAI({
      apiKey: "11d1916f92be445e9df2d2f26d2d11d5",
   });

   const transcriber = client.streaming.transcriber({
      sampleRate: 24.00,
      formatTurns : true,
      endOfTurnConfidenceThreshold : 0.7,
      minEndOfTurnSilenceWhenConfident: 160,
      maxTurnSilence: 2400,
      keyterms : [],
      language:"en"
   });

   transcriber.on("open", ({id})=>{
      console.log(`Session started with ID: ${id}`);
   });

   transcriber.on("error", (err)=>{
      console.log("Error", err);
   });

   transcriber.on("turn", (turn)=>{
      if (!turn.transcript){
         return;
      }

      console.log("Transcript" + turn.transcript);
   });

   transcriber.on("close", (code, reason)=>{
      console.log("closed", code, reason);
   });
}