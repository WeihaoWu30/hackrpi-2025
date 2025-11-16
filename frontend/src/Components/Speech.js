import { Fragment, useState } from "react";
import { useReducer } from "react";
import { useRef } from "react";
import { useTranscript } from "./TranscriptContext";


export default function Speech() {
  // const [transcript, setTranscript] = useState("");
  const { transcript, updateTranscript, clearTranscript } = useTranscript();
  const [isRecording, setRecording] = useState(false);

  const ws = useRef(null);
  const stream = useRef(null);
  const audioContext = useRef(null);
  const source = useRef(null);
  const processor = useRef(null);

  const startRecording = async (e) => {
    e.preventDefault();

    if (isRecording) {
      setRecording(false);
      ws.current?.close();
      stream.current?.getTracks().forEach((track) => track.stop());
      audioContext.current?.close();
      processor.current?.disconnect();
      const response = await fetch(process.env.REACT_APP_BACKEND + "/scribe", {
        method: "POST",
        headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      const msg = data.content;
      clearTranscript();
      updateTranscript(msg);
      // clearTranscript();
    } else {
      clearTranscript();
      setRecording(true);
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      ws.current = new WebSocket(
        `wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&token=${process.env.REACT_APP_ASSEMBLY_API_KEY}`
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
            // setTranscript(prev => prev + message.transcript + ". ");
            updateTranscript(message.transcript + ". ");
            // console.log(message.transcript);
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
    <Fragment>
      <div className="record-container">
        <button type="button" onClick={startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
          <i
            className={`fa fa-microphone${isRecording ? "-slash" : ""}`}
            aria-hidden="true"
          ></i>
        </button>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
<<<<<<< HEAD
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Chat History</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">...</div>
      </div>
    </Fragment>
=======
        {isRecording ? "Stop Recording" : "Start Recording"}
        <i
          className={`fa fa-microphone${isRecording ? "-slash" : ""}`}
          aria-hidden="true"
        ></i>
      </button>
      {/* Manual offcanvas with conditional rendering*/}
      {/* {showOffcanvas && (
        <div
          className="offcanvas offcanvas-start show"
          style={{ visibility: "visible" }}
          tabIndex="-1"
        >
          <div className="offcanvas-header">
            <h5>Recording</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowOffcanvas(false)}
            ></button>
          </div>
          <div className="offcanvas-body">{transcript}</div>
        </div>
      )} */}

      {/* Backdrop */}
      {/* {showOffcanvas && (
        <div
          className="offcanvas-backdrop show"
          onClick={() => setShowOffcanvas(false)}
        ></div>
      )} */}
        {/* <div className="offcanvas-body">{transcript}</div> */}
      {/* </div> */}
      {/* <p>{transcript}</p> */}
    </div>
>>>>>>> origin/main
  );
}
