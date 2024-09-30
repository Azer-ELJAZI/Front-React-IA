import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ee.css";

function App() {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();
  const videoRef = useRef();

  // Réinitialise les résultats et les erreurs
  const resetState = useCallback(() => {
    setResults([]);
    setError("");
  }, []);

  // Fonction pour gérer le téléchargement de l'image
  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        resetState();
      }
    },
    [resetState]
  );

  // Fonction pour gérer le changement d'URL de l'image
  const handleInputChange = useCallback(
    (e) => {
      setImageUrl(e.target.value);
      resetState();
    },
    [resetState]
  );

  // Charger le modèle MobileNet avec sélection du backend
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsModelLoading(true);

        // Essayer de définir le backend WebGL, puis le CPU si WebGL échoue
        await tf.setBackend("webgl").catch(async () => {
          await tf.setBackend("cpu");
        });

        await tf.ready(); // S'assurer que le backend est prêt avant de charger le modèle

        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
      } catch (error) {
        console.error("Erreur lors du chargement du modèle:", error);
        setError(
          "Erreur lors du chargement du modèle. Veuillez réessayer plus tard."
        );
      } finally {
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  // Fonction pour détecter l'objet dans l'image
  const detectImage = useCallback(async () => {
    if (!model || !imageRef.current) return;

    try {
      const detectionResults = await model.classify(imageRef.current);
      setResults(detectionResults);
    } catch (error) {
      console.error("Erreur lors de la détection:", error);
      setError("Erreur lors de la détection de l'image.");
    }
  }, [model]);

  // Fonction pour ouvrir ou fermer la caméra
const toggleCamera = useCallback(() => {
  if (isCameraOpen) {
    // Arrêter le flux de la caméra
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOpen(false);
  } else {
    // Ouvrir la caméra
    setIsCameraOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Erreur lors de l'ouverture de la caméra:", err);
        setError("Erreur lors de l'ouverture de la caméra.");
      });
  }
}, [isCameraOpen]);

  // Fonction pour capturer la photo
  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const url = canvas.toDataURL();
    setImageUrl(url);
    resetState();

    // Arrêter le flux de la caméra
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setIsCameraOpen(false);
  }, [resetState]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      
      <h1 className="header">Image Detection</h1>
      {isModelLoading ? (
        <h2>Initialisation du modèle...</h2>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <>
          <div className="inputField">
            <input
              type="file"
              accept="image/*"
              className="uploadInput"
              onChange={uploadImage}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <button
              className="uploadImage"
              onClick={() => fileInputRef.current.click()}
            >
              Upload Image
            </button>
            <span className="or">OR</span>
            <input
              type="text"
              placeholder="Enter Image URL"
              ref={textInputRef}
              value={imageUrl}
              onChange={handleInputChange}
            />
            <span className="or">OR</span>
            <button className="openCamera" onClick={toggleCamera}>
              {isCameraOpen ? "Close Camera" : "Take Photo"}
            </button>
          </div>

          {isCameraOpen && (
            <div className="cameraWrapper">
              <video
                ref={videoRef}
                autoPlay
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              ></video>
              <button className="button" onClick={capturePhoto}>
                Capture Photo
              </button>
            </div>
          )}

          <div className="imageWrapper">
            {imageUrl && (
              <div className="imageContent">
                <div className="imageArea">
                  <img
                    src={imageUrl}
                    alt="Image Preview"
                    crossOrigin="anonymous"
                    ref={imageRef}
                    style={{ maxWidth: "100%", maxHeight: "400px" }}
                  />
                </div>
                {results.length > 0 && (
                  <div className="imageResult">
                    {results.map((result, index) => (
                      <div className="result" key={result.className}>
                        <span className="name">{result.className}</span>
                        <span className="accuracy">
                          Précision : {(result.probability * 100).toFixed(2)}%{" "}
                          {index === 0 && (
                            <span className="bestGuess">Best Guess</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {imageUrl && (
              <button className="button" onClick={detectImage}>
                Detect Image
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
