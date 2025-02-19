import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  AudioVisualizer ,
  BarVisualizer ,
  VoiceAssistantControlBar ,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { Track } from 'livekit-client';
import useAccessToken from './utils/useAccessToken';



const serverUrl = import.meta.env.VITE_LIVELIT_SERVER_URL;
const token = useAccessToken();
console.log('token',token);

export default function App() {
  return (
    <LiveKitRoom
      audio={true}
      token={token}
      serverUrl={serverUrl}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100vh',width:'100vw' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}

      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />

      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}

        <BarVisualizer  />
        <VoiceAssistantControlBar />

    </LiveKitRoom>
  );
}
