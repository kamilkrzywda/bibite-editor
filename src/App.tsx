import { Box, Button, Container, TextareaAutosize } from '@mui/material';

import useBibite from '@/useBibite';

import { BrainVisualiser } from './BrainVisualiser';
import { FileLoader } from './FileLoader';
import { prettyPrintBibite } from './helpers';

function App() {
    const bibiteHook = useBibite();
    const { fileName, bibiteData, onDropFile, exportFile, setEdgeWeight } = bibiteHook;

    return (
        <Container maxWidth="xl">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                {!fileName ? (
                    <Box>
                        <FileLoader onDrop={onDropFile} />
                    </Box>
                ) : (
                    <>
                        <Box sx={{ height: '90vh' }} className="canvasContainer">
                            <BrainVisualiser
                                setEdgeWeight={setEdgeWeight}
                                brain={bibiteData.brain}
                            />
                        </Box>
                        <Box>
                            <Button onClick={exportFile}>Download {fileName}</Button>
                            <Button onClick={() => location.reload()}>Reset</Button>
                        </Box>
                        <Box
                            sx={{
                                height: 600,
                                overflowY: 'scroll',
                                textAlign: 'left',
                            }}
                        >
                            <TextareaAutosize
                                style={{ width: '100%' }}
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
