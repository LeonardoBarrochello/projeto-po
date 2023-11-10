// SocketComponent.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SocketComponent = () => {
  const [location, setLocation] = useState(null);

  const socket = io("http://localhost:5000"); // Substitua pelo seu endereço Socket.IO

  useEffect(() => {
    // Criação do socket
    const socket = io("http://localhost:5000");

    // Lidar com eventos do servidor
    const handleLocationUpdate = (newLocation) => {
      console.log("alou", newLocation);
      setLocation(newLocation);
    };

    // Adiciona o ouvinte do evento
    socket.on("locationUpdate", handleLocationUpdate);

    // Limpar os eventos ao desmontar o componente
    return () => {
      console.log("Desconectando socket");
      // Remove o ouvinte do evento
      socket.off("locationUpdate", handleLocationUpdate);
      // Desconecta o socket
      socket.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "700px",
      }}
    >
      <h1>Ultima localização</h1>
      {location && (
        <div
          style={{
            height: "100%",
          }}
        >
          <p>
            Última Localização Recebida: {location.latitude},
            {location.longitude}
          </p>

          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?q=${location.latitude},${location.longitude}&zoom=21&key=AIzaSyAsCrPo9P2avBC6jBvb54o8oYdWZDHMt_M`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SocketComponent;
