import { useRef } from "react";
import { Brain } from "@/bibte.type";

import "./BrainVisualiser.css";

import {
    GraphCanvas,
    GraphCanvasRef,
    GraphEdge,
    GraphNode,
    InternalGraphEdge,
    useSelection,
    darkTheme,
    Theme,
} from "reagraph";

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
    const graphRef = useRef<GraphCanvasRef | null>(null);

    const nodes: GraphNode[] = brain.Nodes.map((node) => ({
        id: node.Index,
        label: `${node.Desc} (${node.Index}, ${node.TypeName})`,
        fill:
            node.TypeName === "Input" ? "red" : node.Desc.startsWith("Hidden") ? "yellow" : "blue",
        data: node,
    }));

    const edges: GraphEdge[] = brain.Synapses.map((edge) => ({
        id: `${edge.NodeIn}-${edge.NodeOut}`,
        source: edge.NodeIn,
        target: edge.NodeOut,
        label: edge.Weight.toString(),
        data: edge,
    }));

    const { selections, onNodeClick, onCanvasClick } = useSelection({
        ref: graphRef,
        nodes: nodes,
        edges: edges,
    });

    const nodesFiltered = nodes.filter((node) => {
        return (
            brain.Synapses.find((edge) => edge.NodeIn === node.id) ||
            brain.Synapses.find((edge) => edge.NodeOut === node.id)
        );
    });

    const onEdgeClick = (edge: InternalGraphEdge) => {
        console.log({ edges, edge });
    };

    return edges.length > 0 ? (
        <div className="canvasContainer">
            <GraphCanvas
                onEdgeClick={onEdgeClick}
                nodes={nodesFiltered}
                edges={edges}
                theme={myTheme}
                layoutType="treeLr2d"
                labelType="all"
                draggable={true}
            />
        </div>
    ) : null;
}

export default BrainVisualiser;
