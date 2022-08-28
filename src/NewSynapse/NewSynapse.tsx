import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

import { Brain, BrainNode, BrainSynapse } from '@/types/bibte.type';

export interface Props {
    brain: Brain;
    createSynapse: (synapse: BrainSynapse) => void;
}

function NewSynapse({ brain, createSynapse }: Props) {
    const confirm = useConfirm();

    const nodes: BrainNode[] = brain.Nodes;

    const nodeOptions = nodes.map((node) => (
        <MenuItem key={node.Index} value={node.Index}>{`${node.Desc} (${node.Index})`}</MenuItem>
    ));

    const createSynapseHandler = (newSynapse: BrainSynapse) => {
        createSynapse(newSynapse);
    };

    const newSynapseForm = () => {
        let NodeIn = 0;
        let NodeOut = 0;
        let Weight = 0;
        confirm({
            title: 'Add synapse:',
            content: (
                <Stack spacing={2} direction="column" sx={{ pt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>In</InputLabel>
                        <Select
                            label="In"
                            defaultValue={NodeIn}
                            onBlur={(event) => (NodeIn = parseInt(event.target.value as string))}
                        >
                            {nodeOptions}
                        </Select>
                    </FormControl>
                    <TextField
                        label={'New synapse weight'}
                        defaultValue={Weight}
                        onBlur={(event) =>
                            (Weight = parseFloat(event.target.value.replaceAll(',', '.')))
                        }
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Out</InputLabel>
                        <Select
                            label="Out"
                            defaultValue={NodeOut}
                            onBlur={(event) => (NodeOut = parseInt(event.target.value as string))}
                        >
                            {nodeOptions}
                        </Select>
                    </FormControl>
                </Stack>
            ),
        })
            .then(() => {
                createSynapseHandler({
                    Inov: 0,
                    NodeIn: NodeIn,
                    NodeOut: NodeOut,
                    Weight: Weight,
                    En: true,
                });
            })
            .catch(() => {
                /* ... */
            });
    };

    return (
        <>
            <Button variant="contained" onClick={newSynapseForm}>
                Add new synapse
            </Button>
        </>
    );
}

export default NewSynapse;
