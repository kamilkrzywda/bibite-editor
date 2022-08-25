import _ from 'lodash';
import { useCallback, useState } from 'react';

import { exportFileHelper, fileToString } from './helpers';
import { Bibite, BrainSynapse } from './types/bibte.type';

function useBibite() {
    const [fileName, setFileName] = useState<string>('');
    const [data, setData] = useState<Bibite>({
        brain: {
            Nodes: [],
            Synapses: [],
        },
    });

    const { brain } = data;

    const bibiteData = {
        ...data,
        brain: {
            ...brain,
            Synapses: [..._.orderBy(brain.Synapses, ['NodeIn', 'NodeOut'])],
        },
    };

    const setEdgeWeight = (synapse: BrainSynapse, weight: number) => {
        const newSynapses: BrainSynapse[] = [
            ..._.reject(brain.Synapses, {
                NodeIn: synapse.NodeIn,
                NodeOut: synapse.NodeOut,
            }),
            { ...(_.omit(synapse, ['source', 'target']) as BrainSynapse), Weight: weight },
        ];
        const newBibiteData = {
            ...bibiteData,
            brain: {
                ...brain,
                Synapses: newSynapses,
            },
        };
        setData(newBibiteData);
    };

    const exportFile = () => exportFileHelper(bibiteData, fileName);

    const onDropFile = useCallback(async (files: File[]) => {
        setFileName(files[0].name);
        setData(JSON.parse(await fileToString(files[0])));
    }, []);

    return { fileName, bibiteData, exportFile, onDropFile, setEdgeWeight };
}

export default useBibite;
