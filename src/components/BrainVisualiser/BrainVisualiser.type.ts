import { GraphEdge, GraphNode, InternalGraphEdge } from 'reagraph';

import { BrainNode, BrainSynapse } from 'types/bibte.type';

export interface BrainGraphNode extends GraphNode {
    data: BrainNode;
}

export interface BrainGraphEdge extends GraphEdge {
    data: BrainSynapse;
}

export interface InternalBrainGraphEdge extends InternalGraphEdge {
    data?: BrainSynapse;
}
