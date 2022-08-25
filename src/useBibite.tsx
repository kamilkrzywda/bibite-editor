import { useCallback, useState } from 'react';

import { Bibite } from './bibte.type';

import { exportFileHelper, fileToString } from './helpers';

function useBibite() {
    const [fileName, setFileName] = useState<string>('');
    const [bibiteData, setBibiteData] = useState<Bibite>({
        brain: {
            Nodes: [],
            Synapses: [],
        },
    });

    const setTag = (name: string = 'test') => {
        setBibiteData({
            ...bibiteData,
            genes: {
                ...bibiteData.genes,
                tag: name,
            },
        });
    };

    const setWeight = (edgeId: string) => {
        console.log({ edgeId });
    };

    const exportFile = () => exportFileHelper(bibiteData, fileName);

    const onDropFile = useCallback(async (files: File[]) => {
        setFileName(files[0].name);
        setBibiteData(JSON.parse(await fileToString(files[0])));
    }, []);

    return { fileName, bibiteData, exportFile, onDropFile, setTag, setWeight };
}

export default useBibite;
