export interface BrainNode {
    Type: number;
    TypeName: "Input" | "TanH" | "Sigmoid" | "ReLu";
    Index: string;
    Inov: number;
    Desc: string;
    Value: number; //float
    LastInput: number;
    LastOutput: number;
}

export interface BrainSynapse {
    Inov: number;
    NodeIn: string;
    NodeOut: string;
    Weight: number; //float
    En: boolean;
}

export interface Body {
    mouth: { attackedLastFrame: boolean; biteProgress: number };
    stomach: { content: [] };
    health: number;
    energy: number;
    d2Size: number;
    dying: boolean;
    born: boolean;
    wasteBank: number;
    attackedDmg: number;
}

export interface Brain {
    isReady?: boolean;
    parent?: boolean;
    Nodes: BrainNode[];
    Synapses: BrainSynapse[];
}

export interface Genes {
    LayTime: number;
    BroodTime: number;
    HatchTime: number;
    SizeRatio: number;
    SpeedRatio: number;
    ColorR: number;
    ColorG: number;
    ColorB: number;
    Strength: number;
    Defence: number;
    MutationAmountSigma: number;
    AverageMutationNumber: number;
    BrainMutationSigma: number;
    BrainAverageMutation: number;
    ViewAngle: number;
    ViewRadius: number;
    ClockSpeed: number;
    PheroSense: number;
    Diet: number;
    ImmuneSystemStrength: number;
    HerdSeparationWeight: number;
    HerdAlignmentWeight: number;
    HerdCohesionWeight: number;
    HerdVelocityWeight: number;
    HerdSeparationDistance: number;
    GrowthScale: number;
    GrowthMaturityFactor: number;
    GrowthMaturityExponent: number;
}

export interface Bibite {
    transform?: {
        position?: number[];
        rotation?: number;
        scale?: number;
    };
    rb2d?: {
        px?: number;
        py?: number;
        vx?: number;
        vy?: number;
        r?: number;
    };
    genes?: {
        genes?: Genes;
        tag?: string;
        isReady?: boolean;
        gen?: number;
    };
    growth?: { maturity?: number; mature?: boolean };
    clock?: {
        tic?: number;
        ticProgress?: number;
        timeAlive?: number;
        chronoTime?: number;
    };
    body?: Body;
    brain: Brain;
    immuneSystem?: {
        activeViruses?: [];
        strainResistances?: [];
        activationLevel?: number;
        perceivedInfectionLevel?: number;
    };
    version?: string;
}
