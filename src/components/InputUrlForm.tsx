import React, { useState, useEffect } from "react";
import api from "../services/api";

const InputUrlForm: React.FC = () => {
    const [url, setUrl] = useState(""); // Entrada do usuário
    const [shortenedUrl, setShortenedUrl] = useState(""); // URL encurtada da última requisição
    const [shortenedUrls, setShortenedUrls] = useState([]); // Lista de URLs encurtadas
    const [error, setError] = useState(""); // Mensagens de erro

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
            setShortenedUrls((prev) => [...prev, response.data]); // Atualiza a lista com a nova URL encurtada
            setUrl(""); // Limpa o campo de entrada
        } catch (err: any) {
            setError("Erro ao encurtar a URL. Tente novamente.");
        }
    };

    // Função para buscar todas as URLs encurtadas (GET)
    const fetchShortenedUrls = async () => {
        try {
            const response = await api.get("/shortened-urls"); // Substitua pelo endpoint correto
            setShortenedUrls(response.data); // Armazena as URLs retornadas
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

            {/* Campo de entrada e botão */}
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

            {/* Resultado da última URL encurtada */}
            {shortenedUrl && (
                <div style={{ marginTop: "20px" }}>
                    <h3>URL Encurtada:</h3>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
                        {shortenedUrl}
                    </a>
                </div>
            )}

            {/* Lista de URLs encurtadas */}
            <div style={{ marginTop: "30px" }}>
                <h3>Histórico de URLs Encurtadas:</h3>
                {shortenedUrls.length > 0 ? (
                    <ul style={{ textAlign: "left" }}>
                        {shortenedUrls.map((item: any, index: number) => (
                            <li key={index}>
                                <strong>Original:</strong>{" "}
                                <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
                                    {item.originalUrl}
                                </a>{" "}
                                <br />
                                <strong>Encurtada:</strong>{" "}
                                <a href={item.shortenedUrl} target="_blank" rel="noopener noreferrer">
                                    {item.shortenedUrl}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhuma URL encurtada encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default InputUrlForm;
