const subscribers = {};
let ws = null;
let queue = [];
let responsePromises = {};
let eventsStarted = false;
let connected = false;

const sendMessage = (obj) => {
  if (queue)
    queue.push(obj);
  else
    ws.send(JSON.stringify(obj));
};

function connectWs(wsUrl) {
  if (connected) {
    return;
  }
  ws = new WebSocket(wsUrl);

  ws.addEventListener('error', (e) => {
    console.error(e);
  });

  ws.addEventListener('open', () => {
    console.log('Connected!');
    connected = true;
    let q = queue;
    queue = null;

    for (let msg of q)
      sendMessage(msg);
  });

  ws.addEventListener('message', (msg) => {
    try {
      msg = JSON.parse(msg.data);
    } catch (e) {
      console.error('Invalid message received: ', msg);
      return;
    }

    if (msg.rseq !== undefined && responsePromises[msg.rseq]) {
      responsePromises[msg.rseq](msg);
      delete responsePromises[msg.rseq];
    } else {
      processEvent(msg);
    }
  });

  ws.addEventListener('close', () => {
    queue = [];
    connected = false;

    console.log('Trying to reconnect...');
    // Don't spam the server with retries.
    setTimeout(() => {
      connectWs(wsUrl);
    }, 5000);
  });
}

function processEvent(msg) {
  if (subscribers[msg.type]) {
    for (let sub of subscribers[msg.type])
      sub(msg);
  }
}

function addOverlayListener(event, cb) {
  if (eventsStarted && subscribers[event]) {
    console.warn(`A new listener for ${event} has been registered after event transmission has already begun.
Some events might have been missed and no cached values will be transmitted.
Please register your listeners before calling startOverlayEvents().`);
  }

  if (!subscribers[event]) {
    subscribers[event] = [];
  }

  subscribers[event].push(cb);
};

function startOverlayEvents() {
  eventsStarted = false;

  sendMessage({
    call: 'subscribe',
    events: Object.keys(subscribers),
  });
};

onmessage = (message) => {
  console.log('received connect request');
  if (message.data && message.data.connect && message.data.connectUrl) {
    connectWs(message.data.connectUrl);
  }
}