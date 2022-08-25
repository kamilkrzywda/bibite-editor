import { Box, Input } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { GraphCanvas, darkTheme } from 'reagraph';

import { Brain, BrainSynapse } from '@/types/bibte.type';

import './BrainVisualiser.css';
import { BrainGraphEdge, BrainGraphNode, InternalBrainGraphEdge } from './BrainVisualiser.type';

export interface Props {
    brain: Brain;
    setEdgeWeight: (synapse: BrainSynapse, weight: number) => void;
}

function BrainVisualiser({ brain, setEdgeWeight }: Props) {
    const confirm = useConfirm();

    const nodes: BrainGraphNode[] = brain.Nodes.map((node) => ({
        id: node.Index,
        label: `${node.Desc} (${node.Index}, ${node.TypeName})`,
        fill:
            node.TypeName === 'Input' ? 'red' : node.Desc.startsWith('Hidden') ? 'yellow' : 'blue',
        data: node,
    }));

    const edges: BrainGraphEdge[] = brain.Synapses.map((edge) => ({
        id: `${edge.NodeIn}-${edge.NodeOut}`,
        source: edge.NodeIn,
        target: edge.NodeOut,
        label: edge.Weight.toString(),
        data: edge,
    }));

    const nodesFiltered = nodes.filter(
        (node) =>
            brain.Synapses.find((edge) => edge.NodeIn === node.id) ||
            brain.Synapses.find((edge) => edge.NodeOut === node.id)
    );

    const onEdgeClick = async (edge: InternalBrainGraphEdge) => {
        let weight = 0;
        const synapse = edge.data as BrainSynapse;
        synapse &&
            confirm({
                title: 'Set synapse weight:',
                content: (
                    <Input
                        defaultValue={synapse.Weight}
                        onBlur={(event) =>
                            (weight = parseFloat(event.target.value.replaceAll(',', '.')))
                        }
                        fullWidth
                    />
                ),
            })
                .then(() => {
                    setEdgeWeight(synapse, weight);
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
