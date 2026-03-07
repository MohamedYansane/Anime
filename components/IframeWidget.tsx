"use client";

import { useEffect } from "react";

const IframeWidget = () => {
  useEffect(() => {
    // choose correct chatbot url based on environment
    const isProd = process.env.NODE_ENV === "production";
    const chatbotUrl = isProd
      ? "https://smychat.com/chatbot"
      : "http://localhost:3000/chatbot"; // change if your dev chatbot runs on another port

    const allowedOrigin = isProd
      ? "https://smychat.com"
      : "http://localhost:3000";

    // create iframe element
    const iframe = document.createElement("iframe");
    iframe.src = chatbotUrl;
    iframe.classList.add("smychat-screen");

    // j'ajoute cette ligne pour forcer la transparence au niveau du DOM :
    // iframe.setAttribute("allowtransparency", "true");

    // append iframe to the document body
    document.body.appendChild(iframe);

    // handle iframe messages
    const handleMessage = (e: MessageEvent) => {
      // ignore messages from unknown origins
      if (e.origin !== allowedOrigin) return null;

      try {
        // receive dimensions from iframe
        const dimensions = JSON.parse(e.data);

        // apply new height/width
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;

        // send handshake key back to iframe
        iframe.contentWindow?.postMessage(
          "aec71077-2fd8-4b23-83db-348d580694fe",
          allowedOrigin,
        );
      } catch (error) {
        console.log("failed to handle iframe message", error);
      }
    };

    window.addEventListener("message", handleMessage);

    // cleanup on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
      iframe.remove();
    };
  }, []);

  // this component only manipulates the dom, so it renders nothing
  return null;
};

export default IframeWidget;
