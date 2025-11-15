import { AssemblyAI } from "assemblyai";
import { Readable} from "stream";
import recorder from "node-record-lpcm16";

const run = async() => {
   const client = new AssemblyAI({
      apiKey: "11d1916f92be445e9df2d2f26d2d11d5",
   });

   const transcriber = client.streaming.transcriber({
      sampleRate: 16000,
      formatTurns : true,
      endOfTurnConfidenceThreshold : 0.7,
      minEndOfTurnSilenceWhenConfident: 160,
      maxTurnSilence: 2400,
      keytermsPrompt : [],
      language:"en"
   });

   transcriber.on("open", ({id})=>{
      console.log(`Session started with ID: ${id}`);
   });

   transcriber.on("error", (err)=>{
      console.log("Error", err);
   });

   transcriber.on("partial transcripts", (msg)=>{
      if (!msg.transcript){
         return;
      }

      console.log("Partial Transcript" + msg.transcript);
   });

   transcriber.on("final transcript", (msg)=>{
      if (!msg.transcript){
         return;
      }
      console.log("Final Transcript" + msg.transcript);
   });


   transcriber.on("close", (code, reason)=>{
      console.log("closed", code, reason);
   });

   try{
      await transcriber.connect();
      console.log("started recording");

      const recording = recorder.record({
         channels: 1,
         sampleRate: 16000,
         audioType: "wav"
      });

      Readable.toWeb(recording.stream()).pipeTo(transcriber.stream());
      process.on("SIGINT", async function(){
         recording.stop();
         transcriber.close();
         process.exit();
      });
   }catch(err){
      console.error(err);
   }
};

run();