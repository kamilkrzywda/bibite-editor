import { Box, Button, Container, Stack, TextareaAutosize } from '@mui/material';

import useBibite from '@/useBibite';

import { BrainVisualiser } from './BrainVisualiser';
import { FileLoader } from './FileLoader';
import NewSynapse from './NewSynapse/NewSynapse';
import { prettyPrintBibite } from './helpers';

function App() {
    const {
        fileName,
        bibiteData,
        onDropFile,
        exportFile,
        setSynspseWeight,
        removeSynapse,
        createSynapse,
    } = useBibite();

    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4 }}>
                {!fileName ? (
                    <Box>
                        <FileLoader onDrop={onDropFile} />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ height: 'calc(100vh - 100px)' }} className="canvasContainer">
                            <BrainVisualiser
                                setSynspseWeight={setSynspseWeight}
                                removeSynapse={removeSynapse}
                                brain={bibiteData.brain}
                            />
                        </Box>
                        <Stack spacing={2} direction="row" sx={{ p: 2 }}>
                            <Button variant="contained" onClick={() => location.reload()}>
                                Reset
                            </Button>
                            <Button variant="contained" onClick={exportFile}>
                                Download {fileName}
                            </Button>
                            <NewSynapse brain={bibiteData.brain} createSynapse={createSynapse} />
                        </Stack>
                        <Box
                            sx={{
                                minHeight: 600,
                                overflowY: 'scroll',
                                textAlign: 'left',
                            }}
                        >
                            <TextareaAutosize
                                style={{ width: '100%', maxWidth: '100%' }}
                                readOnly
                                value={prettyPrintBibite(bibiteData)}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
}

export default App;
