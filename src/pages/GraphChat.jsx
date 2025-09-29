import { useEffect } from "react";
import { postActionAx } from "../api";
import axios from "axios";
import useErrorHandler from "../hooks/useErrorHandler";

const GraphChat = (props) => {
  // const errorHandler = useErrorHandler(); // Initialize the error handler

  // useEffect(() => {
  //   const loginDiyar = async () => {
  //     try {
  //       const response = await axios.post("https://diyar.datall.ir/login", {
  //         username: "sadeghi.hamidreza1400@gmail.com",
  //         password: "@1234",
  //       });
  //       // Optionally handle the response (e.g., store token)
  //       console.log("Login successful:", response);
  //     } catch (error) {
  //       errorHandler(error); // Use the error handler from your hook
  //     }
  //   };

  //   loginDiyar(); // Call the login function
  // }, []); // Include errorHandler in the dependency array
  return (
    <iframe
      src="http://diyar.datall.ir" // Your Chainlit server URL
      width="100%"
      height="100%"
      frameBorder="0"
      title="Chainlit Chat UI"
    ></iframe>

    // <iframe
    //   src="http://192.168.2.82:5175?id=51" // Your Chainlit server URL
    //   width="100%"
    //   height="100%"
    //   frameBorder="0"
    //   title="Chainlit Chat UI"
    // ></iframe>
  );
};

export default GraphChat;
