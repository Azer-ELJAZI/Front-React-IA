import { CircularProgress } from '@mui/material';
import * as handpose from '@tensorflow-models/handpose';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

function SignLanguageApp() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [translatedText, setTranslatedText] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const previousTextRef = useRef('');

  const runModel = async () => {
    try {
      setLoading(true);
      const net = await handpose.load();
      console.log('Handpose model loaded.');
      setLoading(false);

      setInterval(() => {
        detect(net);
      }, 100);
    } catch (error) {
      console.error('Error loading the model:', error);
      setLoading(false);
    }
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hands = await net.estimateHands(video);

      if (hands.length > 0) {
        const signText = translateSignLanguage(hands);

        if (signText !== previousTextRef.current) {
          setTranslatedText(signText);
          setHistory(prevHistory => [signText, ...prevHistory]);
          previousTextRef.current = signText;
        }

        const ctx = canvasRef.current.getContext('2d');
        drawHand(hands, ctx);
      }
    }
  };

  const translateSignLanguage = (hands) => {
    if (hands.length > 0) {
      const hand = hands[0];
      const landmarks = hand.landmarks;
      const openFingers = countOpenFingers(landmarks);

      switch (openFingers) {
        case 4:
          return 'Bonjour';
        case 1:
          return 'Quel est votre rôle en tant que chatbot ?';
        case 2:
          return 'Quels sont les services existants ?';
        case 3:
          return 'Quelles sont les entreprises existantes ?';
        case 5:
          return 'Comment ajouter, modifier ou supprimer des entreprises';
        default:
          return 'Salut';
      }
    }
    return 'No hand detected';
  };

  const countOpenFingers = (landmarks) => {
    let openFingers = 0;
    const fingerTips = [8, 12, 16, 20];
    const fingerBases = [5, 9, 13, 17];

    fingerTips.forEach((tip, index) => {
      if (landmarks[tip][1] < landmarks[fingerBases[index]][1]) {
        openFingers++;
      }
    });

    return openFingers;
  };

  const drawHand = (predictions, ctx) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const landmarks = prediction.landmarks;
        for (let i = 0; i < landmarks.length; i++) {
          const x = landmarks[i][0];
          const y = landmarks[i][1];
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 3 * Math.PI); // Reduced size of hand points
          ctx.fillStyle = '#ff7043';
          ctx.fill();
        }
      });
    }
  };

  useEffect(() => {
    runModel();
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.translatedTextContainer}>
          {loading ? (
            <CircularProgress color="primary" size={24} /> // Reduced spinner size
          ) : (
            <p style={styles.translatedText}>{translatedText}</p>
          )}
        </div>

        <div style={styles.webcamSection}>
          <div style={styles.webcamContainer}>
            <Webcam ref={webcamRef} muted={true} style={styles.webcam} />
            <canvas ref={canvasRef} style={styles.canvas} />
          </div>
        </div>

        <div style={styles.historyContainer}>
          <ul style={styles.historyList}>
            {history.map((entry, index) => (
              <li key={index} style={styles.historyItem}>
                {entry}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the top
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: 'Roboto, sans-serif',
    paddingTop: '10px', // Reduced padding
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '600px', // Reduced width
    height: 'auto', // Flexible height
    borderRadius: '12px', // Reduced border radius
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // Reduced shadow
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '15px', // Reduced padding
  },
  webcamSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px', // Reduced margin
  },
  translatedTextContainer: {
    padding: '15px', // Reduced padding
    backgroundColor: '#ffffff',
    color: '#37474f',
    borderRadius: '6px', // Reduced border radius
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', // Reduced shadow
    fontSize: '18px', // Reduced font size
    marginBottom: '15px', // Reduced margin
  },
  webcamContainer: {
    position: 'relative',
    width: '100%',
    height: '300px', // Reduced height
    borderRadius: '12px', // Reduced border radius
    overflow: 'hidden',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)', // Reduced shadow
  },
  webcam: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  historyContainer: {
    marginTop: '15px', // Reduced margin
    width: '100%',
    padding: '10px', // Reduced padding
    backgroundColor: '#ffffff',
    borderRadius: '12px', // Reduced border radius
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)', // Reduced shadow
    overflowX: 'auto',
  },
  historyList: {
    display: 'flex',
    justifyContent: 'center',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    fontSize: '14px', // Reduced font size
    color: '#455a64',
  },
  historyItem: {
    padding: '8px', // Reduced padding
    margin: '0 8px', // Reduced margin
    borderBottom: '1px solid #ddd',
  },
};

export default SignLanguageApp;
