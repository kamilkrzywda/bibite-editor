import { useCallback, useState } from "react";

import { Bibite } from "./bibte.type";

function useBibite() {
    const [fileName, setFileName] = useState<string>("");
    const [bibiteData, setBibiteData] = useState<Bibite>({
        brain: {
            Nodes: [],
            Synapses: [],
        },
    });

    const exportFile = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(bibiteData)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = fileName;
        link.click();
    };

    const setTag = (name: string) => {
        setBibiteData({
            ...bibiteData,
            genes: {
                ...bibiteData.genes,
                tag: "test",
            },
        });
    };

    const onDropFile = useCallback(async (files: File[]) => {
        setFileName(files[0].name);
        const data = String.fromCharCode.apply(null, [
            ...new Uint8Array(await files[0].arrayBuffer()),
        ]);
        setBibiteData(JSON.parse(data));
    }, []);

    return { fileName, bibiteData, exportFile, onDropFile, setTag };
}

export default useBibite;
