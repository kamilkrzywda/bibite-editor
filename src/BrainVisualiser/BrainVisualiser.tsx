import { Box } from '@mui/material';
import { GraphCanvas, GraphEdge, GraphNode, InternalGraphEdge, Theme, darkTheme } from 'reagraph';

import { Brain } from '@/bibte.type';

import './BrainVisualiser.css';

const myTheme: Theme = {
    ...darkTheme,
    canvas: {
        ...darkTheme.canvas,
    },
    node: {
        ...darkTheme.node,
    },
};

interface Props {
    brain: Brain;
}
function BrainVisualiser({ brain }: Props) {
    const nodes: GraphNode[] = brain.Nodes.map((node) => ({
        id: node.Index,
        label: `${node.Desc} (${node.Index}, ${node.TypeName})`,
        fill:
            node.TypeName === 'Input' ? 'red' : node.Desc.startsWith('Hidden') ? 'yellow' : 'blue',
        data: node,
    }));

    const edges: GraphEdge[] = brain.Synapses.map((edge) => ({
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

    const onEdgeClick = (edge: InternalGraphEdge) => {
        console.log({ edges, edge });
    };

    return edges.length > 0 ? (
        <Box sx={{ width: 1200, height: 1200 }}>
            <GraphCanvas
                onEdgeClick={onEdgeClick}
                nodes={nodesFiltered}
                edges={edges}
                theme={myTheme}
                layoutType="treeLr2d"
                labelType="all"
                draggable
            />
        </Box>
    ) : null;
}

export default BrainVisualiser;
