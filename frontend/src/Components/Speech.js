import {useState} from 'react';
import { useReducer } from 'react';
import { useRef } from 'react';
import { useTranscript } from './TranscriptContext';

export default function Speech(){
   // const [transcript, setTranscript] = useState("");
   const { transcript, updateTranscript, clearTranscript } = useTranscript();
   const [isRecording, setRecording] = useState(false);

  const ws = useRef(null);
  const stream = useRef(null);
  const audioContext = useRef(null);
  const source = useRef(null);
  const processor = useRef(null);

   const startRecording = async(e) =>{
      e.preventDefault();

      
      if(isRecording) {
         setRecording(false);
         ws.current?.close();
         stream.current?.getTracks().forEach(track => track.stop());
         audioContext.current?.close();
         processor.current?.disconnect();
         await fetch(process.env.REACT_APP_BACKEND, {method: "POST", body: JSON.stringify({transcript})});
         clearTranscript();
      } else {
         setRecording(true);
         stream.current = await navigator.mediaDevices.getUserMedia({audio: true});
         ws.current = new WebSocket(`wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=${process.env.REACT_APP_ASSEMBLY_API_KEY}`);
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
                  // setTranscript(prev => prev + message.transcript + ". ");
                  updateTranscript(message.transcript + ". ");
                  // console.log(message.transcript);
               }
            }catch(err){
               console.log("Error", err);
            }
   
   
         }
   

    if (isRecording) {
      setRecording(false);
      ws.current?.close();
      stream.current?.getTracks().forEach((track) => track.stop());
      audioContext.current?.close();
      processor.current?.disconnect();
      await fetch(process.env.REACT_APP_BACKEND, {
        method: "POST",
        body: JSON.stringify({ transcript }),
      });
      setTranscript("");
    } else {
      setRecording(true);
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      ws.current = new WebSocket(
        "wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=11d1916f92be445e9df2d2f26d2d11d5"
      );
      audioContext.current = new AudioContext({ sampleRate: 16000 });
      source.current = audioContext.current.createMediaStreamSource(
        stream.current
      );
      processor.current = audioContext.current.createScriptProcessor(
        4096,
        1,
        1
      );
      ws.current.onmessage = (msg) => {
        try {
          console.log(msg.data);
          const message = JSON.parse(msg.data);
          console.log(message.type);
          if (message.type == "Turn" && message.end_of_turn) {
            // console.log("isjfklasfjsaklfas");
            // console.log(msg.data);
            setTranscript((prev) => prev + message.transcript + " ");
            // console.log(message.transcript);
          } else {
            console.log("fuck this");
          }
        } catch (err) {
          console.log("Error", err);
        }
      };

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
  };

  return (
    <div className="record-container">
      <button className="record" onClick={startRecording}>
        Start Recording
        {isRecording ? (
          <i className="fa fa-microphone-slash" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-microphone" aria-hidden="true"></i>
        )}
      </button>
      {/* <p>{transcript}</p> */}

      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasStart"
        aria-controls="offcanvasStart"
      >
        Transcript
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasStart"
        aria-labelledby="offcanvasStartLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasStartLabel">Chat History</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">{transcript}</div>
      </div>
      <p>{transcript}</p>
    </div>
  );
}
