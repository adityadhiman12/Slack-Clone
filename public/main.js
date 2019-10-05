async function fetchChannel() {
  const channels = await fetch('http://localhost:2000/api/channels');
  const channelsData = await channels.json();
  return channelsData;
}

async function fetchMessages() {
  const messages = await fetch('http://localhost:2000/api/messages');
  const messagesData = await messages.json();
  return messagesData;
  // console.log(messagesArray);
}


function toArray(channels) {
  const channelArray = [];
  channels.forEach((element) => {
    channelArray.push(element);
  });
  return channelArray;
}


function displayChannelNames(channelNameArray) {
  const unorderedList = document.querySelector('#channels');
  const channel = document.querySelector('#channel');
  // console.log(channel);

  channelNameArray.forEach((individualChannel) => {
    const newChannel = channel.cloneNode(true);
    const channelName = newChannel.querySelector('p');

    channelName.textContent = individualChannel.name;

    channelName.setAttribute('channelId', individualChannel.id);

    unorderedList.appendChild(newChannel);
  });
  // console.log(unorderedList.textContent);
}

async function showMessages(channelNameArray, messagesArray) {
  // eslint-disable-next-line no-unused-vars
  let channelId = null;
  const unorderedList = document.querySelector('#channels');
  const messageUnorderedList = document.querySelector('#messages');
  const message = document.querySelector('#message');
  unorderedList.addEventListener('click', (event) => {
    channelNameArray.forEach((channel) => {
      if (event.target.innerText === channel.name) {
        channelId = channel.id;

        while (messageUnorderedList.hasChildNodes()) {
          messageUnorderedList.removeChild(messageUnorderedList.firstChild);
        }
      }
    });
    console.log(channelId);
    messagesArray.forEach((individualMessage) => {
      if (channelId === individualMessage.channel_id) {
        const newMessage = message.cloneNode(true);
        const messageValue = newMessage.querySelector('p');

        console.log(messageValue.textContent);

        messageValue.textContent = individualMessage.textMsg;
        messageValue.setAttribute('messageId', individualMessage.id);
        messageUnorderedList.append(newMessage);
      }
    });
  });
}

function formEventListener() {
  const addMessages = document.forms[0];
  // console.log(addMessage);
  const messageUnorderedList = document.querySelector('#messages');
  const message = document.querySelector('#message');
  addMessages.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputMessage = addMessages.querySelector('input[type="text"]').value;
    // console.log(inputMessage);
    const newMessage = message.cloneNode(true);
    const messageValue = newMessage.querySelector('p');
    messageValue.textContent = inputMessage;
    // console.log(messageValue.textContent);
    messageUnorderedList.appendChild(messageValue);
  });
}


fetchChannel().then((channel) => {
  const channelNameArray = toArray(channel);
  displayChannelNames(channelNameArray);
  fetchMessages().then((messages) => {
    const messagesArray = toArray(messages);
    showMessages(channelNameArray, messagesArray);
    formEventListener();
  });
});
