const GraphChat = (props) => {
  return (
    <iframe
      src="http://diar.datall.ir:40560" // Your Chainlit server URL
      width="100%"
      height="100%"
      frameBorder="0"
      title="Chainlit Chat UI"
    ></iframe>
  );
};

export default GraphChat;
