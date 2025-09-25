/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { 
    processApiError, 
    padImageToAspectRatio,
    parseDataUrl, 
    callGeminiWithRetry, 
    processGeminiResponse 
} from './baseService';

interface PatternDesignerOptions {
    useBasicOptions: boolean;
    useAdvancedOptions: boolean;
    applyMode: string;
    aspectRatio: string;
    patternScale: number;
    notes: string;
    changeObjectColor: boolean;
    objectColorToChange: string;
    removeWatermark: boolean;
    productType: string;
    // T-shirt options
    tshirtColorBody: string;
    tshirtColorLeftSleeve: string;
    tshirtColorRightSleeve: string;
    tshirtColorCollar: string;
    tshirtColorHem: string;
    tshirtPrintStyle: string;
    tshirtPrintPosition: string;
    tshirtFit: string;
    tshirtCollarStyle: string;
    tshirtSleeveStyle: string;
    tshirtLength: string;
    tshirtFabric: string;
}

export async function applyPatternToClothing(
    clothingImageUrl: string,
    patternImageUrl: string,
    patternImageUrl2: string | null,
    options: PatternDesignerOptions
): Promise<string> {
    const clothingToProcess = await padImageToAspectRatio(clothingImageUrl, options.aspectRatio ?? 'Giữ nguyên');
    const { mimeType: clothingMime, data: clothingData } = parseDataUrl(clothingToProcess);
    const { mimeType: patternMime, data: patternData } = parseDataUrl(patternImageUrl);

    const clothingImagePart = { inlineData: { mimeType: clothingMime, data: clothingData } };
    const patternImagePart = { inlineData: { mimeType: patternMime, data: patternData } };
    const allParts: object[] = [clothingImagePart, patternImagePart];

    if (patternImageUrl2) {
        const { mimeType: patternMime2, data: patternData2 } = parseDataUrl(patternImageUrl2);
        const patternImagePart2 = { inlineData: { mimeType: patternMime2, data: patternData2 } };
        allParts.push(patternImagePart2);
    }

    const promptParts = [
        "**Nhiệm vụ:** Bạn là một AI chuyên gia thiết kế thời trang. Sử dụng các hình ảnh được cung cấp:",
        "- **Ảnh 1:** Ảnh trang phục (áo, váy, quần, v.v.).",
        "- **Ảnh 2:** Ảnh chứa họa tiết chính.",
    ];
    
    if (patternImageUrl2) {
        promptParts.push("- **Ảnh 3:** Ảnh chứa họa tiết thứ hai.");
    }

    promptParts.push(
        "",
        "**QUY TRÌNH THỰC HIỆN (ƯU TIÊN TUYỆT ĐỐI):**",
        "1. **Phân tích Ảnh 1 (Ảnh Trang Phục):** Đây là ảnh gốc và là nền tảng cho kết quả cuối cùng. Bức ảnh kết quả PHẢI giữ nguyên 100% kích thước, bố cục, người mẫu (nếu có), tư thế, và bối cảnh của ảnh này.",
        `2. **Trích xuất Họa Tiết (Từ Ảnh 2${patternImageUrl2 ? ' và Ảnh 3' : ''}):** Chỉ sử dụng (các) ảnh này để lấy MẪU HỌA TIẾT hoặc KẾT CẤU. Bỏ qua **TẤT CẢ** các yếu tố khác như bố cục, vật thể, chữ viết, hoặc các yếu tố giao diện người dùng có trong (các) ảnh này.`,
        "3. **Áp dụng Họa Tiết:** Áp dụng họa tiết đã trích xuất lên trang phục trong Ảnh 1. Họa tiết phải được áp dụng một cách tự nhiên, tuân thủ theo các nếp gấp, hình dạng và ánh sáng của trang phục gốc.",
        ""
    );
    
    if (options.useAdvancedOptions || options.useBasicOptions) {
        promptParts.push("**HƯỚNG DẪN BỔ SUNG:**");
    }

    const addInstruction = (text: string) => {
        promptParts.push(`- ${text}`);
    };
    
    if (options.useAdvancedOptions && options.productType && options.productType !== 'Tự động') {
        addInstruction(`**Loại sản phẩm:** Trang phục trong Ảnh 1 là một "${options.productType}". Hãy điều chỉnh cách áp dụng họa tiết cho phù hợp với kiểu dáng và chất liệu của loại trang phục này.`);
    }

    if (options.useBasicOptions) {
        const scaleLevels = ["nhỏ", "trung bình", "lớn", "rất lớn"];
        addInstruction(`**Tỷ lệ Họa tiết:** Áp dụng họa tiết với kích thước ${scaleLevels[options.patternScale] || 'trung bình'}.`);

        if (options.applyMode && options.applyMode !== 'Tự động') {
            addInstruction(`**Chế độ Áp dụng:** ${options.applyMode}.`);
        }
    }

    if (options.useAdvancedOptions && options.productType === 'Áo thun') {
        promptParts.push(
            "",
            "**YÊU CẦU CHI TIẾT VỀ ÁO THUN (ƯU TIÊN TUYỆT ĐỐI):**",
            "Phải tuân thủ chính xác các tùy chỉnh sau đây cho áo thun:"
        );

        const colorInstructions = [];
        if (options.tshirtColorBody) colorInstructions.push(`- **Thân áo:** Màu nền chính là ${options.tshirtColorBody}.`);
        if (options.tshirtColorLeftSleeve) colorInstructions.push(`- **Tay áo trái:** Màu ${options.tshirtColorLeftSleeve}.`);
        if (options.tshirtColorRightSleeve) colorInstructions.push(`- **Tay áo phải:** Màu ${options.tshirtColorRightSleeve}.`);
        if (options.tshirtColorCollar) colorInstructions.push(`- **Cổ áo:** Màu ${options.tshirtColorCollar}.`);
        if (options.tshirtColorHem) colorInstructions.push(`- **Lai áo:** Màu ${options.tshirtColorHem}.`);
        if (colorInstructions.length > 0) {
            promptParts.push("**1. Chỉnh màu:**");
            promptParts.push(...colorInstructions);
        }

        const printInstructions = [];
        if (options.tshirtPrintStyle && options.tshirtPrintStyle !== 'Tự động') {
            printInstructions.push(`- **Kiểu in:** Áp dụng họa tiết theo kiểu "${options.tshirtPrintStyle}", mô phỏng đúng chất liệu và hiệu ứng của kiểu in đó.`);
        }
        if (options.tshirtPrintPosition) {
            printInstructions.push(`- **Vị trí & Kích thước:** ${options.tshirtPrintPosition}.`);
        }
        if (printInstructions.length > 0) {
            promptParts.push("**2. Họa tiết & Hình in:**");
            promptParts.push(...printInstructions);
        }

        const fitInstructions = [];
        if (options.tshirtFit && options.tshirtFit !== 'Tự động') fitInstructions.push(`- **Kiểu dáng:** ${options.tshirtFit}.`);
        if (options.tshirtCollarStyle && options.tshirtCollarStyle !== 'Tự động') fitInstructions.push(`- **Kiểu cổ áo:** ${options.tshirtCollarStyle}.`);
        if (options.tshirtSleeveStyle && options.tshirtSleeveStyle !== 'Tự động') fitInstructions.push(`- **Kiểu tay áo:** ${options.tshirtSleeveStyle}.`);
        if (options.tshirtLength && options.tshirtLength !== 'Tự động') fitInstructions.push(`- **Độ dài:** ${options.tshirtLength}.`);
        if (fitInstructions.length > 0) {
            promptParts.push("**3. Kiểu dáng & Form áo:**");
            promptParts.push(...fitInstructions);
        }

        if (options.tshirtFabric && options.tshirtFabric !== 'Tự động') {
            promptParts.push("**4. Chất liệu vải:**");
            promptParts.push(`- Mô phỏng chính xác kết cấu và nếp gấp của vải "${options.tshirtFabric}".`);
        }
    }
    
    if (options.useAdvancedOptions && options.notes) {
        addInstruction(`**Ghi chú bổ sung (Ưu tiên cao):** ${options.notes}`);
    }

    if (options.useBasicOptions && options.changeObjectColor && options.objectColorToChange) {
        addInstruction(`**Thay đổi màu sắc (Ưu tiên cao):** Dựa vào Ghi chú bổ sung để xác định vật thể, sau đó thay đổi màu của vật thể đó thành màu **${options.objectColorToChange}**.`);
    }

    if (options.aspectRatio && options.aspectRatio !== 'Giữ nguyên') {
        addInstruction(`**Tỷ lệ khung hình:** Ảnh kết quả BẮT BUỘC phải có tỷ lệ ${options.aspectRatio}. Nếu Ảnh 1 có viền trắng, hãy lấp đầy chúng một cách sáng tạo, liền mạch với bối cảnh.`);
    }

    if (options.removeWatermark) {
        promptParts.push("**YÊU CẦU THÊM:** Ảnh kết quả không được chứa bất kỳ watermark, logo hay chữ ký nào.");
    }
    
    promptParts.push("\n**ĐẦU RA:** Chỉ trả về hình ảnh đã hoàn thành, không kèm văn bản.");

    const prompt = promptParts.join('\n');
    const textPart = { text: prompt };
    allParts.push(textPart);

    try {
        console.log("Attempting to apply pattern to clothing...");
        const response = await callGeminiWithRetry(allParts);
        return processGeminiResponse(response);
    } catch (error) {
        const processedError = processApiError(error);
        console.error("Error during pattern application:", processedError);
        throw processedError;
    }
}