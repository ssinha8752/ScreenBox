import React from 'react';
import useMediaRecorder from '@wmik/use-media-recorder';
import { Button } from 'evergreen-ui';


function Player({ srcBlob, audio }) {
  if (!srcBlob) {
    return null;
  }

  if (audio) {
    return <audio src={URL.createObjectURL(srcBlob)} controls />;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      controls
    />
  );
}

function ScreenRecorder() {
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true }
  });

  return (
    <div>
    <article style={{display:"flex", background:"#333"}}>
      <div style={{backgroundColor: "#4CAF50",
      color: "white", padding:"0px 20px", fontSize:"20px", fontWeight:500}}><p>ScreenBox</p></div>
      <section style={{padding:"20px 20px"}}>
        <Button
          type="button"
          onClick={getMediaStream}
          disabled={status === 'ready'}
          appearance="primary"
          marginRight={16}
          intent="default"
        >
          Share screen
        </Button>
        <Button
          type="button"
          onClick={startRecording}
          disabled={status === 'recording'}
          appearance="primary"
          marginRight={16}
          intent="success"
        >
          Start recording
        </Button>
        <Button
          type="button"
          onClick={stopRecording}
          disabled={status !== 'recording'}
          appearance="primary"
          marginRight={16}
          intent="danger"
        >
          Stop recording
        </Button>
        <Button
          appearance="primary"
          marginRight={16}
          intent="warning"
        >
          Warning
        </Button>
      </section>
      </article>
      <div style={{display:"flex"}}>
      <div style={{ margin: "100px"}}>
      <p>STEPS : <br></br> 1. Select the screen you want to record
      <br></br> 2. After selecting the screen, Start the recording
      <br></br> 3. Once the recording is done, Stop it
      <br></br> 4. Recorded video will be displayed on the Right side of the screen
      <br></br> 5. Play it and save it by right-click on the video
      <br></br><br></br>Status : <span style={{color:"red", fontWeight:400, fontSize:"20px"}}>{error ? `${status} ${error.message}` : status}</span></p>
      </div>
      <div style={{alignContent:"center"}}> 
      <Player srcBlob={mediaBlob} />
      </div>
      </div>
    </div>
  );
}

export default ScreenRecorder;