import {useState} from 'react';

export default function Speech(){
   const [transcript, setTranscript] = useState("");

   const startRecording = async(e) =>{
      e.preventDefault();
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      const ws = new WebSocket("wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=11d1916f92be445e9df2d2f26d2d11d5");
      
      // ws.onopen = () =>{
      //    // ws.send(JSON.stringify({
      //    //    type: "session:begin",
      //    //    session: { sample_rate: 16000, language: "en" },
      //    //    token: { api_key: "11d1916f92be445e9df2d2f26d2d11d5" } 
      //    //  }));
          
      // }
      ws.onmessage = (msg) =>{
         try{
            console.log(msg.data);
            const message = JSON.parse(msg.data);
            console.log(message.type);
            if (message.type == "Turn"){
               // console.log("isjfklasfjsaklfas");
               // console.log(msg.data);
               setTranscript(message.transcript);
               // console.log(message.transcript);
            }
            else{
               console.log("fuck this");
            }

         }catch(err){
            console.log("Error", err);
         }


      }

      const mediaRecorder = new MediaRecorder(stream, {mimeType: "audio/webm"});

      const audioContext = new AudioContext({sampleRate: 16000});
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = (event) => {
         const inputData = event.inputBuffer.getChannelData(0); // Float32Array
         const buffer = new ArrayBuffer(inputData.length * 2); // PCM16
         const view = new DataView(buffer);
   
         for (let i = 0; i < inputData.length; i++) {
           let s = Math.max(-1, Math.min(1, inputData[i]));
           view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
         }
   
         if (ws.readyState === WebSocket.OPEN) {
           ws.send(buffer);
         }
       };

       source.connect(processor);
       processor.connect(audioContext.destination);

      //  mediaRecorder.ondataavailable = async(e) =>{
      //    if (e.data.size > 0){
      //       const arrayBuffer = await e.data.arrayBuffer();
      //       const audioBlob = new Blob([arrayBuffer]);
      //       // console.log("it works");
      //       ws.send(arrayBuffer);
      //    }
      // };
      // mediaRecorder.start(100);
   }

   return(
      <div>
         <button onClick={startRecording}>Start Recording</button>
         <p>{transcript}</p>
      </div>
   )
}