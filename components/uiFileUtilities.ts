/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import toast from 'react-hot-toast';
import type { ChangeEvent } from 'react';
// FIX: Import VideoTask to be used in processAndDownloadAll
import { type ImageForZip, type VideoTask } from './uiTypes';

// Extend the global Window interface for JSZip
declare global {
    interface Window {
        JSZip: any;
    }
}

/**
 * Downloads an image from a data URL or blob URL.
 * @param url The URL of the image to download.
 * @param filename The desired filename for the downloaded image.
 */
export function downloadImage(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    const extension = url.startsWith('blob:') ? 'mp4' : 'png';
    link.download = `${filename}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Downloads a JSON object as a file.
 * @param jsonData The JSON object to download.
 * @param filename The name for the resulting file.
 */
export function downloadJson(jsonData: object, filename: string) {
    const dataStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}


/**
 * Extracts embedded JSON from a PNG file's metadata.
 * @param file The PNG file to process.
 * @returns A promise that resolves to the parsed JSON object or null if not found.
 */
export function extractJsonFromPng(file: File): Promise<any | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result instanceof ArrayBuffer) {
                const arr = new Uint8Array(e.target.result);
                // Look for a tEXt or iTXt chunk with the keyword "aPixSettings"
                const keyword = "aPixSettings";
                const keywordBytes = keyword.split('').map(c => c.charCodeAt(0));

                for (let i = 0; i < arr.length - 8; i++) {
                    // Check for tEXt or iTXt chunk type
                    if (
                        (arr[i+4] === 116 && arr[i+5] === 69 && arr[i+6] === 88 && arr[i+7] === 116) || // tEXt
                        (arr[i+4] === 105 && arr[i+5] === 84 && arr[i+6] === 88 && arr[i+7] === 116) // iTXt
                    ) {
                        const chunkLength = (arr[i] << 24) | (arr[i+1] << 16) | (arr[i+2] << 8) | arr[i+3];
                        const chunkStart = i + 8;
                        
                        let keywordFound = true;
                        for(let j=0; j < keywordBytes.length; j++) {
                            if(arr[chunkStart + j] !== keywordBytes[j]) {
                                keywordFound = false;
                                break;
                            }
                        }
                        
                        // Check for null separator after keyword
                        if(keywordFound && arr[chunkStart + keywordBytes.length] === 0) {
                            let jsonStart = chunkStart + keywordBytes.length + 1; // +1 for null separator
                            
                            // iTXt has extra fields before the data
                            if (arr[i+4] === 105) { // iTXt
                                const compressionFlag = arr[jsonStart];
                                const compressionMethod = arr[jsonStart+1];
                                if (compressionFlag !== 0 || compressionMethod !== 0) {
                                    console.warn("Compressed iTXt chunk found, which is not supported for JSON extraction.");
                                    continue;
                                }
                                // Skip past compression flag, method, language tag (null), and translated keyword (null)
                                let langTagEnd = jsonStart + 2;
                                while(langTagEnd < chunkStart + chunkLength && arr[langTagEnd] !== 0) langTagEnd++;
                                let transKeyEnd = langTagEnd + 1;
                                while(transKeyEnd < chunkStart + chunkLength && arr[transKeyEnd] !== 0) transKeyEnd++;
                                jsonStart = transKeyEnd + 1;
                            }

                            const textDecoder = new TextDecoder('utf-8');
                            const jsonString = textDecoder.decode(arr.slice(jsonStart, chunkStart + chunkLength));
                            try {
                                resolve(JSON.parse(jsonString));
                                return;
                            } catch (parseError) {
                                console.error("Found keyword but failed to parse JSON:", parseError);
                            }
                        }
                    }
                }
                resolve(null); // No valid chunk found
            } else {
                reject(new Error("Failed to read file as ArrayBuffer"));
            }
        };
        reader.onerror = (e) => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}


/**
 * Downloads multiple images as a zip file.
 * @param images An array of objects with URL, filename, and optional folder.
 * @param zipFilename The name for the resulting zip file.
 */
export function downloadAllImagesAsZip(images: ImageForZip[], zipFilename: string) {
    const toastId = toast.loading('Đang chuẩn bị tệp zip...');

    const loadJSZip = () => {
        return new Promise<void>((resolve, reject) => {
            if (window.JSZip) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load JSZip library.'));
            document.head.appendChild(script);
        });
    };
    
    loadJSZip().then(async () => {
        const zip = new window.JSZip();
        
        const fetchPromises = images.map(async (imgInfo) => {
            try {
                const response = await fetch(imgInfo.url);
                if (!response.ok) throw new Error(`Failed to fetch ${imgInfo.url}`);
                const blob = await response.blob();
                const extension = imgInfo.extension || imgInfo.url.split(';')[0].split('/')[1] || 'png';
                const path = imgInfo.folder ? `${imgInfo.folder}/${imgInfo.filename}.${extension}` : `${imgInfo.filename}.${extension}`;
                zip.file(path, blob);
            } catch (error) {
                console.error(`Could not add ${imgInfo.filename} to zip:`, error);
            }
        });
        
        await Promise.all(fetchPromises);
        
        zip.generateAsync({ type: 'blob' }).then((content) => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = zipFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success('Tệp zip đã được tải xuống!', { id: toastId });
        }).catch(err => {
             console.error('Failed to generate zip file:', err);
             toast.error('Không thể tạo tệp zip.', { id: toastId });
        });
    }).catch(err => {
        console.error(err);
        toast.error('Không thể tải thư viện nén file.', { id: toastId });
    });
}

/**
 * Handles file upload from an input element, validates it's an image,
 * and calls a success callback with the data URL.
 * @param e The change event from the file input.
 * @param onSuccess The callback to execute with the image data URL.
 */
export const handleFileUpload = (
  e: ChangeEvent<HTMLInputElement>,
  onSuccess: (imageDataUrl: string) => void
) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onSuccess(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('Invalid file type uploaded:', file.type);
    }
  }
};

/**
 * Combines multiple images into a single image based on layout options.
 * @param items Array of objects containing image URL and an optional label.
 * @param options Configuration for layout, gap, and labels.
 * @returns A promise that resolves to the data URL of the combined image.
 */
export const combineImages = async (
    items: { url: string; label: string; }[],
    options: {
        layout: 'smart-grid' | 'horizontal' | 'vertical';
        mainTitle?: string;
        gap: number;
        backgroundColor?: string;
        labels: {
            enabled: boolean;
            fontColor: string;
            backgroundColor: string;
            baseFontSize: number;
        };
    }
): Promise<string> => {
    const { layout, mainTitle, gap, backgroundColor, labels } = options;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Could not get canvas context");

    const images = await Promise.all(items.map(item => new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image: ${item.url.substring(0, 50)}...`));
        img.src = item.url;
    })));

    let totalWidth = 0, totalHeight = 0;
    const PADDING = mainTitle || labels.enabled ? Math.max(20, gap * 2) : gap;
    const LABEL_HEIGHT = labels.enabled ? labels.baseFontSize * 1.5 : 0;
    const TITLE_HEIGHT = mainTitle ? labels.baseFontSize * 2 : 0;

    // Calculate dimensions
    if (layout === 'horizontal') {
        totalWidth = images.reduce((sum, img) => sum + img.width, 0) + (images.length - 1) * gap + PADDING * 2;
        totalHeight = Math.max(...images.map(img => img.height)) + PADDING * 2 + TITLE_HEIGHT + (labels.enabled ? LABEL_HEIGHT : 0);
    } else if (layout === 'vertical') {
        totalWidth = Math.max(...images.map(img => img.width)) + PADDING * 2;
        totalHeight = images.reduce((sum, img) => sum + img.height, 0) + (images.length - 1) * gap + PADDING * 2 + TITLE_HEIGHT + (labels.enabled ? items.length * LABEL_HEIGHT : 0);
    } else { // smart-grid
        const numCols = Math.ceil(Math.sqrt(images.length));
        const numRows = Math.ceil(images.length / numCols);
        const maxColWidths = Array(numCols).fill(0);
        const maxRowHeights = Array(numRows).fill(0);

        images.forEach((img, i) => {
            const row = Math.floor(i / numCols);
            const col = i % numCols;
            if (img.width > maxColWidths[col]) maxColWidths[col] = img.width;
            if (img.height > maxRowHeights[row]) maxRowHeights[row] = img.height;
        });
        
        totalWidth = maxColWidths.reduce((a, b) => a + b, 0) + (numCols - 1) * gap + PADDING * 2;
        totalHeight = maxRowHeights.reduce((a, b) => a + b, 0) + (numRows - 1) * gap + PADDING * 2 + TITLE_HEIGHT;
    }

    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // Draw background
    if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, totalWidth, totalHeight);
    }

    // Draw Title
    let currentY = PADDING;
    if (mainTitle) {
        ctx.fillStyle = labels.fontColor;
        ctx.font = `bold ${labels.baseFontSize * 1.5}px "Be Vietnam Pro", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(mainTitle, totalWidth / 2, currentY);
        currentY += TITLE_HEIGHT;
    }
    
    // Draw Images & Labels
    if (layout === 'horizontal') {
        let currentX = PADDING;
        images.forEach((img, i) => {
            ctx.drawImage(img, currentX, currentY);
            if (labels.enabled && items[i].label) {
                ctx.fillStyle = labels.backgroundColor;
                ctx.fillRect(currentX, currentY + img.height, img.width, LABEL_HEIGHT);
                ctx.fillStyle = labels.fontColor;
                ctx.font = `${labels.baseFontSize}px "Be Vietnam Pro", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(items[i].label, currentX + img.width / 2, currentY + img.height + LABEL_HEIGHT / 2);
            }
            currentX += img.width + gap;
        });
    } else if (layout === 'vertical') {
        let currentX = PADDING;
        images.forEach((img, i) => {
            ctx.drawImage(img, currentX, currentY);
             if (labels.enabled && items[i].label) {
                ctx.fillStyle = labels.backgroundColor;
                ctx.fillRect(currentX, currentY + img.height, totalWidth - PADDING * 2, LABEL_HEIGHT);
                ctx.fillStyle = labels.fontColor;
                ctx.font = `${labels.baseFontSize}px "Be Vietnam Pro", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(items[i].label, totalWidth / 2, currentY + img.height + LABEL_HEIGHT / 2);
            }
            currentY += img.height + gap + (labels.enabled && items[i].label ? LABEL_HEIGHT : 0);
        });
    } else { // smart-grid
        const numCols = Math.ceil(Math.sqrt(images.length));
        const maxColWidths = Array(numCols).fill(0);
        images.forEach((img, i) => {
            const col = i % numCols;
            if (img.width > maxColWidths[col]) maxColWidths[col] = img.width;
        });

        let currentX = PADDING;
        let rowY = currentY;
        let maxRowHeight = 0;
        
        images.forEach((img, i) => {
            const row = Math.floor(i / numCols);
            const col = i % numCols;
            
            if (col === 0 && i > 0) {
                rowY += maxRowHeight + gap;
                currentX = PADDING;
                maxRowHeight = 0;
            }
            if (col > 0) {
                currentX += maxColWidths[col - 1] + gap;
            }
            
            ctx.drawImage(img, currentX, rowY);
            if (img.height > maxRowHeight) maxRowHeight = img.height;
        });
    }
    return canvas.toDataURL('image/png');
};

// FIX: Add missing embedJsonInPng function
// CRC Table for PNG
const CRC_TABLE = new Int32Array(256);
for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
        c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    CRC_TABLE[n] = c;
}

/**
 * Embeds a JSON object into a PNG data URL as a metadata chunk.
 * @param imageDataUrl The data URL of the PNG image.
 * @param jsonData The JSON object to embed.
 * @param enabled A flag to enable or disable the embedding.
 * @returns A promise that resolves to the new PNG data URL with embedded data, or the original URL if disabled or not a PNG.
 */
export function embedJsonInPng(imageDataUrl: string, jsonData: object, enabled: boolean): Promise<string> {
    return new Promise((resolve) => {
        if (!enabled || !imageDataUrl.startsWith('data:image/png;base64,')) {
            return resolve(imageDataUrl);
        }

        const keyword = "aPixSettings"; // Must be 1-79 characters, no leading/trailing spaces
        const jsonString = JSON.stringify(jsonData);

        // Convert base64 to a Uint8Array
        const base64Data = imageDataUrl.substring('data:image/png;base64,'.length);
        const binaryString = window.atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Find the IEND chunk. We will insert our custom chunk right before it.
        const IEND_CHUNK_TYPE = [0x49, 0x45, 0x4E, 0x44];
        let iendIndex = -1;
        for (let i = 0; i < bytes.length - 12; i++) {
             // Look for chunk length (0) and type IEND
            if (bytes[i] === 0 && bytes[i+1] === 0 && bytes[i+2] === 0 && bytes[i+3] === 0 &&
                bytes[i+4] === IEND_CHUNK_TYPE[0] && bytes[i+5] === IEND_CHUNK_TYPE[1] &&
                bytes[i+6] === IEND_CHUNK_TYPE[2] && bytes[i+7] === IEND_CHUNK_TYPE[3]) {
                iendIndex = i;
                break;
            }
        }
        
        if (iendIndex === -1) {
            console.warn("Could not find IEND chunk in PNG. Cannot embed metadata.");
            return resolve(imageDataUrl);
        }

        // --- Create our tEXt chunk ---
        const textEncoder = new TextEncoder();
        const keywordBytes = textEncoder.encode(keyword);
        const jsonBytes = textEncoder.encode(jsonString);
        
        const chunkData = new Uint8Array(keywordBytes.length + 1 + jsonBytes.length);
        chunkData.set(keywordBytes, 0);
        chunkData.set([0], keywordBytes.length); // Null separator
        chunkData.set(jsonBytes, keywordBytes.length + 1);

        const chunkLength = chunkData.length;
        const chunkType = textEncoder.encode("tEXt");
        const chunkCrcData = new Uint8Array(4 + chunkLength);
        chunkCrcData.set(chunkType, 0);
        chunkCrcData.set(chunkData, 4);

        // CRC calculation
        let crc = -1;
        for (let i = 0; i < chunkCrcData.length; i++) {
            crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ chunkCrcData[i]) & 0xff];
        }
        crc = (crc ^ -1) >>> 0;

        const fullChunk = new Uint8Array(12 + chunkLength);
        const dataView = new DataView(fullChunk.buffer);

        dataView.setUint32(0, chunkLength, false); // Length
        fullChunk.set(chunkType, 4);               // Type
        fullChunk.set(chunkData, 8);               // Data
        dataView.setUint32(8 + chunkLength, crc, false); // CRC

        // --- Combine into new PNG ---
        const newPngBytes = new Uint8Array(bytes.length + fullChunk.length);
        newPngBytes.set(bytes.slice(0, iendIndex), 0);
        newPngBytes.set(fullChunk, iendIndex);
        newPngBytes.set(bytes.slice(iendIndex), iendIndex + fullChunk.length);

        // Convert back to base64
        let newBinaryString = '';
        newPngBytes.forEach(byte => {
            newBinaryString += String.fromCharCode(byte);
        });
        const newBase64 = window.btoa(newBinaryString);

        resolve(`data:image/png;base64,${newBase64}`);
    });
}

// FIX: Add missing processAndDownloadAll function
interface ProcessAndDownloadAllParams {
    inputImages: ImageForZip[];
    historicalImages: (string | { url: string; [key: string]: any })[];
    videoTasks?: Record<string, VideoTask>;
    zipFilename: string;
    baseOutputFilename: string;
}

export function processAndDownloadAll({
    inputImages,
    historicalImages,
    videoTasks = {},
    zipFilename,
    baseOutputFilename,
}: ProcessAndDownloadAllParams) {
    const imagesToZip: ImageForZip[] = [...inputImages];

    historicalImages.forEach((item, index) => {
        const url = typeof item === 'string' ? item : item.url;
        imagesToZip.push({
            url,
            filename: `${baseOutputFilename}-${index + 1}`,
            folder: 'output',
        });
    });

    Object.values(videoTasks).forEach((task, index) => {
        if (task.status === 'done' && task.resultUrl) {
            imagesToZip.push({
                url: task.resultUrl,
                filename: `${baseOutputFilename}-video-${index + 1}`,
                folder: 'output',
                extension: 'mp4',
            });
        }
    });

    if (imagesToZip.length === 0) {
        toast.error("No images to download.");
        return;
    }
    
    downloadAllImagesAsZip(imagesToZip, zipFilename);
}