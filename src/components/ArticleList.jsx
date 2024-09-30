import { ChatContainer, MainContainer, Message, MessageInput, MessageList, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useState } from 'react';
import { FaMicrophone, FaRobot, FaUser } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '../Style/styles.css';


const systemMessage = {
  role: "system",
  content: " "};

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, ! Ask me anything!",
      sentTime: "just now",
      sender: "Chatbot"
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <div>Votre navigateur ne supporte pas la reconnaissance vocale.</div>;
  }

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const handleMicrophoneClick = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      handleSend(transcript);
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'fr-FR' });
      setIsListening(true);
    }
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // Set the language to French
    window.speechSynthesis.speak(utterance);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "Chatbot" ? "assistant" : "user",
      content: messageObject.message
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages]
    };

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      if (response.status === 429) {
        console.error("Rate limit exceeded. Please try again later.");
        setIsTyping(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.choices && data.choices.length > 0) {
        const chatbotMessage = data.choices[0].message.content;
        setMessages([...chatMessages, {
          message: chatbotMessage,
          sender: "Chatbot"
        }]);

        // Make the chatbot read the response aloud
        speakText(chatbotMessage);
      } else {
        console.error("Unexpected response format", data);
      }
    } catch (error) {
      console.error("Error fetching data from OpenAI:", error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="App">
      <div style={{ position: "relative", height: "480px", width: "1200px", margin: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
          <button
            onClick={handleMicrophoneClick}
            style={{
              background: "none",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px",
              transform: "translate(-430px, 500px)"
            }}
          >
            <FaMicrophone style={{ fontSize: "24px", color: listening ? "red" : "black" }} />
          </button>
          <h1 className="scrolling-title" style={{ fontSize: '2.5rem', fontWeight: 'bold'}}>
          WebGuide AI ChatBot

          </h1>
        </div>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="Chatbot is typing" /> : null}
            >
              {messages.map((message, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  {message.sender === "user" ? (
                    <FaUser style={{ marginRight: "5px", color: "#0000ff", fontSize: "24px" }} />
                  ) : (
                    <FaRobot style={{ marginRight: "5px", color: "#008000", fontSize: "24px" }} />
                  )}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Message
                      className={message.sender === "user" ? "user-message" : "chatgpt-message"}
                      model={message}
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: "4px",
                        padding: "10px",
                        borderBottom: `2px solid ${message.sender === "Chatbot" ? "#fc0404" : "#20fd03"}`,
                      }}
                    />
                    <div style={{ fontSize: "12px", color: "#888" }}>{message.sender}</div>
                  </div>
                </div>
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
