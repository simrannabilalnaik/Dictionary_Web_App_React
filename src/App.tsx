import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState<any>(null);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("serif");

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const fetchDefinition = async () => {
    if (!word.trim()) {
      setError("Please enter a word.");
      setDefinition(null);
      setAudioUrl("");
      return;
    }

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();

      if (data.title === "No Definitions Found") {
        setError("No definitions found.");
        setDefinition(null);
        setAudioUrl("");
      } else {
        setDefinition(data[0]);
        setError("");
        const audio = data[0].phonetics.find((p: any) => p.audio);
        setAudioUrl(audio?.audio || "");
      }
    } catch {
      setError("Error fetching data.");
      setDefinition(null);
      setAudioUrl("");
    }
  };

  const getFontFamily = () => {
    if (font === "serif") return "'Merriweather', serif";
    if (font === "sans-serif") return "'Roboto', sans-serif";
    return "'Courier Prime', monospace";
  };

  return (
    <div className={`app ${theme}`} style={{ fontFamily: getFontFamily() }}>
      {/* Top Bar */}
      <header className="top-bar">
        <h4>Dictionary</h4>
        <div>
          <select  value={font} onChange={(e) => setFont(e.target.value)}>
            <option id="text" value="serif">Serif</option>
            <option id="text" value="sans-serif">Sans</option>
            <option id="text"value="monospace">Mono</option>
          </select>
          
           <span className="divider"></span>

        
        <button id="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <img src="/toggle.svg" id="toggleicon"/> :  <img src="/toggle.svg" id="toggleicon"/>}
          </button>

          <button id="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <img src="/moon-outline (1).svg" id="pic"/> : "☀️"}
          
          </button>
        </div>
      </header>

      <div className="search-bar">
  <input
    type="text"
    value={word}
    onChange={(e) => setWord(e.target.value)}
    placeholder="Type something here..."/>
  <img src="/search.svg" id="icon1" className="search-icon" onClick={fetchDefinition} />
</div>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Word Details */}
      {definition && (
        <div className="word-details">
          <div className="word-header">
            <h1>{definition.word}</h1>
            {audioUrl && (
              <button className="audio-btn" onClick={() => new Audio(audioUrl).play()}>
                ▶
              </button>
            )}
          </div>
          <p className="phonetic">{definition.phonetic}</p>

          {definition.meanings.map((m: any, i: number) => (
            <div key={i} className="meaning-block">
              <h3>{m.partOfSpeech}</h3>
              <ul>
                {m.definitions.map((def: any, j: number) => (
                  <li key={j}>{def.definition}</li>
                ))}
              </ul>
              {m.synonyms.length > 0 && (
                <p className="synonyms">Synonyms: {m.synonyms.join(", ")}</p>
              )}
            </div>
          ))}

          <p className="source">
            Source:{" "}
            <a href={definition.sourceUrls[0]} target="_blank" rel="noreferrer">
              {definition.sourceUrls[0]}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;