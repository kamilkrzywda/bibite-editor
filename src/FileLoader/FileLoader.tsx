import { Box, Paper } from '@mui/material';
import { type DropzoneOptions, useDropzone } from 'react-dropzone';

interface Props extends DropzoneOptions {}

function FileLoader({ onDrop }: Props) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Paper sx={{ p: 10 }} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Box>Drop the files here ...</Box>
            ) : (
                <Box>Drop bibite file here (*.json or *.bb8)</Box>
            )}
        </Paper>
    );
}

export default FileLoader;
