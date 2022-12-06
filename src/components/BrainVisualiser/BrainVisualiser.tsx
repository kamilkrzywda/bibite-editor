import { Box, FormControlLabel, Stack, Switch, TextField } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { GraphCanvas, darkTheme } from 'reagraph';

import { Brain, BrainSynapse } from 'types/bibte.type';

import './BrainVisualiser.css';
import { BrainGraphEdge, BrainGraphNode, InternalBrainGraphEdge } from './BrainVisualiser.type';

export interface Props {
    brain: Brain;
    setSynspseWeight: (synapse: BrainSynapse, weight: number) => void;
    removeSynapse: (synapse: BrainSynapse) => void;
}

function BrainVisualiser({ brain, setSynspseWeight, removeSynapse }: Props) {
    const confirm = useConfirm();

    const nodes: BrainGraphNode[] = brain.Nodes.map((node) => ({
        id: node.Index.toString(),
        label: `${node.Desc} (${node.Index}, ${node.TypeName})`,
        fill: node.TypeName === 'Input' ? 'red' : node.Desc.startsWith('Hidden') ? 'yellow' : 'blue',
        data: node,
    }));

    const edges: BrainGraphEdge[] = brain.Synapses.map((edge) => ({
        id: `${edge.NodeIn}-${edge.NodeOut}`,
        source: edge.NodeIn.toString(),
        target: edge.NodeOut.toString(),
        label: edge.Weight.toString(),
        data: edge,
    }));

    const nodesFiltered = nodes.filter(
        (node) =>
            brain.Synapses.find((edge) => edge.NodeIn.toString() === node.id) ||
            brain.Synapses.find((edge) => edge.NodeOut.toString() === node.id)
    );

    const onEdgeClick = async (edge: InternalBrainGraphEdge) => {
        let weight = 0;
        let removeEdge = false;
        const synapse = edge.data as BrainSynapse;
        synapse &&
            confirm({
                title: 'Edit synapse:',
                content: (
                    <Stack spacing={2} direction="column" sx={{ pt: 2 }}>
                        <TextField
                            label={'Set synapse weight'}
                            defaultValue={synapse.Weight}
                            onBlur={(event) => (weight = parseFloat(event.target.value.replaceAll(',', '.')))}
                            fullWidth
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        (removeEdge = event.target.checked)
                                    }
                                />
                            }
                            label="Remove selected synapse"
                        />
                    </Stack>
                ),
            })
                .then(() => {
                    if (removeEdge) {
                        removeSynapse(synapse);
                    } else {
                        setSynspseWeight(synapse, weight);
                    }
                    removeEdge = false;
                })
                .catch(() => {
                    /* ... */
                });
    };

    return edges.length > 0 ? (
        <Box sx={{ width: '100%', height: '100%' }}>
            <GraphCanvas
                onEdgeClick={onEdgeClick}
                nodes={nodesFiltered}
                edges={edges}
                theme={darkTheme}
                animated={false}
                layoutType="treeLr2d"
                labelType="all"
                draggable
            />
        </Box>
    ) : null;
}

export default BrainVisualiser;
