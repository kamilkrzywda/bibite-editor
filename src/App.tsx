import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/acai.css";

import "./App.css";
import { BrainVisualiser } from "./BrainVisualiser";
import { FileLoader } from "./FileLoader";
import useBibite from "./useBibite";

function App() {
    const bibiteHook = useBibite();
    const { fileName, bibiteData, onDropFile, exportFile, setTag } = bibiteHook;

    return (
        <div className="App">
            {!fileName ? (
                <div>
                    <FileLoader onDrop={onDropFile} />
                </div>
            ) : (
                <>
                    <div>
                        <BrainVisualiser brain={bibiteData.brain} />
                    </div>
                    <div>
                        <button onClick={exportFile}>Download {fileName}</button>
                        <button onClick={() => setTag("test")}>setTag to "test"</button>
                        <button onClick={() => location.reload()}>Reset</button>
                    </div>
                    <div className="left" style={{ height: 400, width: 1200, overflowY: "scroll" }}>
                        <JSONPretty json={JSON.stringify(bibiteData)} />
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
