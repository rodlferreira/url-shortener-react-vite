import React, { useEffect, useState } from "react";
import api from "../services/api";

const InputUrlForm: React.FC = () => {
const [url, setUrl] = useState(""); // Campo de entrada do usuário
const [shortenedUrls, setShortenedUrls] = useState([]); // Lista de URLs encurtadas
const [error, setError] = useState(""); // Erros ao encurtar a URL

    const handleShortenUrl = async () => {
        if (!url) {
            setError("Por favor, insira uma URL válida.");
            return;
        }

        try {
            setError("");
            const response = await api.post("/create", { url });
            setShortenedUrls((prev) => [...prev, response.data]); // Adiciona nova URL à lista
            setUrl(""); // Limpa o campo de entrada
        } catch (err: any) {
            setError("Erro ao encurtar a URL. Tente novamente.");
        }
    };

    const fetchShortenedUrls = async () => {
        try {
            const response = await api.get("/all"); // Endpoint para buscar todas as URLs
            setShortenedUrls(response.data); // Armazena todas as URLs encurtadas
        } catch (err: any) {
            console.error("Erro ao buscar URLs encurtadas:", err.message);
        }
    };

    useEffect(() => {
        fetchShortenedUrls();
    }, []);

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h1>Encurtador de URLs</h1>
            <input
                type="text"
                placeholder="Insira a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleShortenUrl}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                Encurtar URL
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginTop: "20px" }}>
                <h3>URLs Encurtadas:</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {shortenedUrls.map((urlObj, index) => (
                        <li key={index} style={{ marginBottom: "10px" }}>
                            <a href={urlObj.shortenedUrl} target="_blank" rel="noopener noreferrer">
                                {urlObj.shortenedUrl}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InputUrlForm;




//



import React, {useEffect, useState} from "react";
import api from "../services/api";

const InputUrlForm: React.FC = () => {
const [url, setUrl] = useState(""); // Campo de entrada do usuário
const [shortenedUrl, setShortenedUrl] = useState(""); // URL encurtada
const [error, setError] = useState(""); // Erros ao encurtar a URL

    const urlCode = String(url);

    // Função para encurtar a URL (POST)
    const handleShortenUrl = async () => {
        if (!url) {
            setError("Por favor, insira uma URL válida.");
            return;
        }

        try {
            setError("");
            const response = await api.post("/create", { url });
            setShortenedUrl(response.data.shortenedUrl);
            setShortenedUrl((prev) => [...prev, response.data]); // Atualiza a lista com a nova URL encurtada
            setUrl(""); // Limpa o campo de entrada
        } catch (err: any) {
            setError("Erro ao encurtar a URL. Tente novamente.");
        }
    };

    // Função para buscar todas as URLs encurtadas (GET)
    const fetchShortenedUrls = async () => {
        try {
            const response = await api.get(`/${urlCode}`);
            setShortenedUrl(response.data); // Armazena as URLs retornadas
        } catch (err: any) {
            console.error("Erro ao buscar URLs encurtadas:", err.message);
        }
    };

    // Executa a função de busca ao montar o componente
    useEffect(() => {
        fetchShortenedUrls();
    }, []);

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h1>Encurtador de URLs</h1>
            <input
                type="text"
                placeholder="Insira a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />
            <button
                onClick={handleShortenUrl}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                Encurtar URL
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {shortenedUrl && (
                <div style={{ marginTop: "20px" }}>
                    <h3>URL Encurtada:</h3>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                        {shortenedUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default InputUrlForm;
