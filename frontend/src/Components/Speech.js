import {useState} from 'react';
import { useReducer } from 'react';
import { useRef } from 'react';

export default function Speech(){
   const [transcript, setTranscript] = useState("");
   const [isRecoding, setRecording] = useState(false);

   const ws = useRef(null);
   const stream = useRef(null);
   const audioContext = useRef(null);
   const source = useRef(null);
   const processor = useRef(null);

   const startRecording = async(e) =>{
      e.preventDefault();
      // const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      // const ws = new WebSocket("wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=11d1916f92be445e9df2d2f26d2d11d5");
      // const audioContext = new AudioContext({sampleRate: 16000});
      // const source = audioContext.createMediaStreamSource(stream);
      // const processor = audioContext.createScriptProcessor(4096, 1, 1);
      
      if(isRecoding) {
         setRecording(false);
         ws.current?.close();
         stream.current?.getTracks().forEach(track => track.stop());
         audioContext.current?.close();
         processor.current?.disconnect();
         setTranscript("");
      } else {
         setRecording(true);
         stream.current = await navigator.mediaDevices.getUserMedia({audio: true});
         ws.current = new WebSocket("wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=11d1916f92be445e9df2d2f26d2d11d5");
         audioContext.current = new AudioContext({sampleRate: 16000});
         source.current = audioContext.current.createMediaStreamSource(stream.current);
         processor.current = audioContext.current.createScriptProcessor(4096, 1, 1);
         ws.current.onmessage = (msg) =>{
            try{
               console.log(msg.data);
               const message = JSON.parse(msg.data);
               console.log(message.type);
               if (message.type == "Turn" && message.end_of_turn){
                  // console.log("isjfklasfjsaklfas");
                  // console.log(msg.data);
                  setTranscript(prev => prev + message.transcript + " ");
                  // console.log(message.transcript);
               }
               else{
                  console.log("fuck this");
               }
   
            }catch(err){
               console.log("Error", err);
            }
   
   
         }
   
         // const mediaRecorder = new MediaRecorder(stream, {mimeType: "audio/webm"});
   
         // const audioContext = new AudioContext({sampleRate: 16000});
         // const source = audioContext.createMediaStreamSource(stream);
         // const processor = audioContext.createScriptProcessor(4096, 1, 1);
   
         processor.current.onaudioprocess = (event) => {
            const inputData = event.inputBuffer.getChannelData(0); // Float32Array
            const buffer = new ArrayBuffer(inputData.length * 2); // PCM16
            const view = new DataView(buffer);
      
            for (let i = 0; i < inputData.length; i++) {
              let s = Math.max(-1, Math.min(1, inputData[i]));
              view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
            }
      
            if (ws.current.readyState === WebSocket.OPEN) {
              ws.current.send(buffer);
            }
          };
   
          source.current.connect(processor.current);
          processor.current.connect(audioContext.current.destination);
      }
      // ws.onmessage = (msg) =>{
      //    try{
      //       console.log(msg.data);
      //       const message = JSON.parse(msg.data);
      //       console.log(message.type);
      //       if (message.type == "Turn" && message.end_of_turn){
      //          // console.log("isjfklasfjsaklfas");
      //          // console.log(msg.data);
      //          setTranscript(prev => prev + message.transcript);
      //          // console.log(message.transcript);
      //       }
      //       else{
      //          console.log("fuck this");
      //       }

      //    }catch(err){
      //       console.log("Error", err);
      //    }


      // }

      // const mediaRecorder = new MediaRecorder(stream, {mimeType: "audio/webm"});

      // const audioContext = new AudioContext({sampleRate: 16000});
      // const source = audioContext.createMediaStreamSource(stream);
      // const processor = audioContext.createScriptProcessor(4096, 1, 1);

      // processor.onaudioprocess = (event) => {
      //    const inputData = event.inputBuffer.getChannelData(0); // Float32Array
      //    const buffer = new ArrayBuffer(inputData.length * 2); // PCM16
      //    const view = new DataView(buffer);
   
      //    for (let i = 0; i < inputData.length; i++) {
      //      let s = Math.max(-1, Math.min(1, inputData[i]));
      //      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      //    }
   
      //    if (ws.readyState === WebSocket.OPEN) {
      //      ws.send(buffer);
      //    }
      //  };

      //  source.connect(processor);
      //  processor.connect(audioContext.destination);

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