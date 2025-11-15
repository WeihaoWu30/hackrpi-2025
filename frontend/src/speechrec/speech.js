import { AssemblyAI } from "assemblyai";
import { Readable} from "stream";
import recorder from "node-record-lpcm16";
import { pipeline } from "stream";

const run = async() => {
   const client = new AssemblyAI({
      apiKey: "11d1916f92be445e9df2d2f26d2d11d5",
   });

   const transcriber = client.streaming.transcriber({
      sampleRate: 16000,
      formatTurns : true,
      endOfTurnConfidenceThreshold : 0.7,
      minEndOfTurnSilenceWhenConfident: 800,
      maxTurnSilence: 2400,
      keytermsPrompt : ["cancer", "patient"],
      language:"en"
   });

   transcriber.on("open", ({id})=>{
      console.log(`Session started with ID: ${id}`);
   });

   transcriber.on("error", (err)=>{
      console.log("Error", err);
   });

   // transcriber.on("partial_transcript", (msg)=>{
   //    if (!msg.transcript){
   //       return;
   //    }
   //    console.log("Partial Transcript", msg.transcript);
   // });

   // transcriber.on("final_transcript", (msg)=>{
   //    if (!msg.transcript){
   //       return;
   //    }
   //    console.log("Final Transcript" + msg.transcript);
   // });

   transcriber.on("turn", (msg)=>{
      if (!msg.transcript){
         return;
      }
      if (msg.end_of_turn && msg.turn_is_formatted){
         let summary = msg.words;
         let final_transcript = "";
         for (const word of summary){
            final_transcript+= word.text;
            final_transcript += " ";
         }
         console.log(final_transcript);
      }
   });


   transcriber.on("close", (code, reason)=>{
      console.log("closed", code, reason);
   });
   async function speech_to_text(){
      try{
         await transcriber.connect();
         console.log("started recording");

         const recording = recorder.record({
            channels: 1,
            sampleRate: 16000,
            audioType: "wav"
         });

         // Readable.toWeb(recording.stream()).pipeTo(transcriber.stream());
         pipeline(
            recording.stream(),
            transcriber.stream(),
            (err)=>{
               if (err){
                  console.log("Error", err);
               }
            }
         )
         process.on("SIGINT", async function(){
            recording.stop();
            transcriber.close();
            process.exit();
         });
      }catch(err){
         console.error(err);
      }
   }

   async function process_speech(){
      await speech_to_text();
   }
process_speech();
};

run();
