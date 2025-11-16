import { Fragment, useState } from "react";
import { useReducer } from "react";
import { useRef } from "react";
import { useTranscript } from "./TranscriptContext";

export default function Speech() {
  // const [transcript, setTranscript] = useState("");
  const { transcript, updateTranscript, clearTranscript } = useTranscript();
  const [isRecording, setRecording] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const ws = useRef(null);
  const stream = useRef(null);
  const audioContext = useRef(null);
  const source = useRef(null);
  const processor = useRef(null);

  const drawer = () => {
    <Fragment>
      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasStart"
        aria-labelledby="offcanvasStartLabel"
      >
        <div className="offcanvas-body">{transcript}</div>
      </div>
      <p>{transcript}</p>
    </Fragment>;
  };

  const startRecording = async (e) => {
    e.preventDefault();
    setShowOffcanvas(true);

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
      clearTranscript();
    } else {
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
    <div className="record-container">
      {/* <p>{transcript}</p> */}

      <button
        className="btn btn-primary"
        type="button"
        onClick={startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
        <i
          className={`fa fa-microphone${isRecording ? "-slash" : ""}`}
          aria-hidden="true"
        ></i>
      </button>
      {/* Manual offcanvas with conditional rendering */}
      {showOffcanvas && (
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
          <div className="offcanvas-body">{/* Your content */}</div>
        </div>
      )}

      {/* Backdrop */}
      {showOffcanvas && (
        <div
          className="offcanvas-backdrop show"
          onClick={() => setShowOffcanvas(false)}
        ></div>
      )}
    </div>
  );
}
