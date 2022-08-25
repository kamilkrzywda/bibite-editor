import { useDropzone, type DropzoneOptions } from "react-dropzone";

interface Props extends DropzoneOptions {}

function FileLoader({ onDrop }: Props) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <div style={{ width: 1080, padding: 60, border: "1px solid red" }}>
                    Drop the files here ...
                </div>
            ) : (
                <div style={{ width: 1080, padding: 60, border: "1px solid red" }}>
                    Drop bibite file here (*.json or *.bb8)
                </div>
            )}
        </div>
    );
}

export default FileLoader;
