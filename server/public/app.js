const participants = document.getElementById('participants');
const localParticipant = document.getElementById('localParticipant');
const localIdentity = document.getElementById('localIdentity');
const remoteParticipant = document.getElementById('remoteParticipant');
const remoteIdentity = document.getElementById('remoteIdentity');
const login = document.getElementById('login');
const usernameInput = document.getElementById('username');
const joinLeaveButton = document.getElementById('joinOrLeave');

let connected = false;
let room;

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const trackSubscribed = (div, track) => {
  const trackElement = track.attach();
  div.appendChild(trackElement);
};

const trackUnsubscribed = (track) => {
  track.detach().forEach(element => {
    element.remove()
  });
};


const participantConnected = (participant) => {
  const tracksDiv = document.createElement('div');
  tracksDiv.setAttribute('id', participant.sid);
  remoteParticipant.appendChild(tracksDiv);
  remoteIdentity.innerHTML = participant.identity;

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(tracksDiv, publication.track);
    }
  });

  participant.on('trackSubscribed', track => trackSubscribed(tracksDiv, track));
  participant.on('trackUnsubscribed', trackUnsubscribed);
};

const participantDisconnected = (participant) => {
  document.getElementById(participant.sid).remove();
  remoteIdentity.innerHTML = '';
};


const addLocalVideo = async() => {
    const videoTrack = await Twilio.Video.createLocalVideoTrack();
    const trackElement = videoTrack.attach();
    localParticipant.appendChild(trackElement);
}


const connectOrDisconnect = async (event) => {
    event.preventDefault();
    if (!connected) {
      const identity = usernameInput.value;
      joinLeaveButton.disabled = true;
      joinLeaveButton.innerHTML = 'Connecting...';
  
      try {
        await connect(identity);
      } catch (error) {
        console.log(error);
        alert('Failed to connect to video room.');
        joinLeaveButton.innerHTML = 'Join Video Call';
        joinLeaveButton.disabled = false;
      }
    }
    else {
      disconnect();
    }
  };

  const connect = async (identity) => {
  const response = await fetch('/kyc/join-meet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'identity': identity,
      'room': params.roomId 
    })
  });

  const data = await response.json();
  room = await Twilio.Video.connect(data.token);
  localIdentity.innerHTML = identity;

  room.participants.forEach(participantConnected);
  room.on('participantConnected', participantConnected);
  room.on('participantDisconnected', participantDisconnected);
  connected = true;

  joinLeaveButton.innerHTML = 'Leave Video Call';
  joinLeaveButton.disabled = false;
  usernameInput.style.display = 'none';
};
  
const disconnect = () => {
  room.disconnect();
  connected = false;
  remoteParticipant.lastElementChild.remove();
  remoteIdentity.innerHTML = '';
  localIdentity.innerHTML = '';
  joinLeaveButton.innerHTML = 'Join Video Call';
  usernameInput.style.display = 'inline-block';
};


login.addEventListener('submit', connectOrDisconnect);
addLocalVideo();