import { Bibite } from './bibte.type';

export const exportFileHelper = (bibiteData: Bibite, fileName: string) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(bibiteData)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = fileName;
    link.click();
};

export const fileToString = async (file: File) =>
    String.fromCharCode.apply(null, [...new Uint8Array(await file.arrayBuffer())]);

export const prettyPrintBibite = (bibiteData: Bibite) => JSON.stringify(bibiteData, undefined, 4);
