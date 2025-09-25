/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { applyPatternToClothing, editImageWithPrompt } from '../services/geminiService';
import ActionablePolaroidCard from './ActionablePolaroidCard';
import Lightbox from './Lightbox';
import { 
    AppScreenHeader,
    handleFileUpload,
    useMediaQuery,
    ImageForZip,
    ResultsView,
    type PatternDesignerState,
    useLightbox,
    OptionsPanel,
    useVideoGeneration,
    processAndDownloadAll,
    SearchableSelect,
    useAppControls,
    embedJsonInPng,
    Slider,
} from './uiUtils';
import { cn } from '../lib/utils';

interface PatternDesignerProps {
    mainTitle: string;
    subtitle: string;
    useSmartTitleWrapping: boolean;
    smartTitleWrapWords: number;
    uploaderCaptionClothing: string;
    uploaderDescriptionClothing: string;
    uploaderCaptionPattern1: string;
    uploaderDescriptionPattern1: string;
    uploaderCaptionPattern2: string;
    uploaderDescriptionPattern2: string;
    addImagesToGallery: (images: string[]) => void;
    appState: PatternDesignerState;
    onStateChange: (newState: PatternDesignerState) => void;
    onReset: () => void;
    onGoBack: () => void;
}

const ColorPickerInput: React.FC<{
    value: string;
    onChange: (color: string) => void;
    disabled?: boolean;
}> = ({ value, onChange, disabled }) => {
    const { t } = useAppControls();

    return (
        <div className="flex flex-col items-start gap-2 bg-black/20 p-3 rounded-lg">
            <label className="text-sm font-medium text-neutral-300">{t('patternDesigner_colorToChangeLabel')}</label>
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                    <input
                        type="color"
                        value={value || '#ffffff'}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        title={t('patternDesigner_colorToChangeLabel')}
                        disabled={disabled}
                    />
                    <div
                        className="w-full h-full rounded-full border-2 border-white/20 shadow-inner pointer-events-none"
                        style={{ backgroundColor: value || '#ffffff' }}
                    />
                </div>
                <input 
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="form-input !py-1 !px-2 !text-sm w-32 font-mono"
                    placeholder="#FFFFFF"
                    disabled={disabled}
                />
            </div>
        </div>
    );
};

const ColorInput: React.FC<{
    label: string;
    value: string;
    onChange: (color: string) => void;
    disabled?: boolean;
}> = ({ label, value, onChange, disabled }) => (
    <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-medium text-neutral-300">{label}</label>
        <div className="relative w-12 h-12">
            <input
                type="color"
                value={value || '#ffffff'}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title={`Chọn màu cho ${label}`}
                disabled={disabled}
            />
            <div
                className="w-full h-full rounded-full border-2 border-white/20 shadow-inner pointer-events-none"
                style={{ 
                    backgroundColor: value || 'transparent', 
                    backgroundImage: !value ? 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)' : undefined, 
                    backgroundSize: '10px 10px', 
                    backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px' 
                }}
            />
        </div>
    </div>
);


const PatternDesigner: React.FC<PatternDesignerProps> = (props) => {
    const { 
        uploaderCaptionClothing, uploaderDescriptionClothing,
        uploaderCaptionPattern1, uploaderDescriptionPattern1,
        uploaderCaptionPattern2, uploaderDescriptionPattern2,
        addImagesToGallery,
        appState, onStateChange, onReset,
        ...headerProps
    } = props;
    
    const { t, settings } = useAppControls();
    const { lightboxIndex, openLightbox, closeLightbox, navigateLightbox } = useLightbox();
    const { videoTasks, generateVideo } = useVideoGeneration();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [localNotes, setLocalNotes] = useState(appState.options.notes);
    
    useEffect(() => {
        setLocalNotes(appState.options.notes);
    }, [appState.options.notes]);

    // When an image is uploaded, its handler updates its specific state field.
    // This effect then watches for the condition where both images are present
    // while the app is still in the 'idle' stage, and transitions it to 'configuring'.
    // This is more robust than having each handler check the other's state.
    useEffect(() => {
        if (appState.stage === 'idle' && appState.clothingImage && appState.patternImage) {
            onStateChange({
                ...appState,
                stage: 'configuring'
            });
        }
    }, [appState.clothingImage, appState.patternImage, appState.stage, onStateChange]);
    
    const APPLY_MODE_OPTIONS: string[] = t('patternDesigner_applyModeOptions');
    const PATTERN_SCALE_LEVELS: readonly string[] = t('patternDesigner_patternScaleLevels');
    const ASPECT_RATIO_OPTIONS = t('aspectRatioOptions');
    const PRODUCT_TYPE_OPTIONS = t('patternDesigner_productTypeOptions');

    const lightboxImages = [appState.clothingImage, appState.patternImage, appState.patternImage2, ...appState.historicalImages].filter((img): img is string => !!img);

    const handleClothingImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        handleFileUpload(e, (imageDataUrl) => {
            onStateChange({
                ...appState,
                clothingImage: imageDataUrl,
                generatedImage: null,
                historicalImages: [],
                error: null,
            });
            addImagesToGallery([imageDataUrl]);
        });
    };

    const handlePatternImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        handleFileUpload(e, (imageDataUrl) => {
            onStateChange({
                ...appState,
                patternImage: imageDataUrl,
                generatedImage: null,
                historicalImages: [],
                error: null,
            });
            addImagesToGallery([imageDataUrl]);
        });
    };

     const handlePatternImage2Upload = (e: ChangeEvent<HTMLInputElement>) => {
        handleFileUpload(e, (imageDataUrl) => {
            onStateChange({
                ...appState,
                patternImage2: imageDataUrl,
            });
            addImagesToGallery([imageDataUrl]);
        });
    };
    
    const handleClothingImageChange = (newUrl: string) => {
        onStateChange({ ...appState, clothingImage: newUrl });
        addImagesToGallery([newUrl]);
    };
    const handlePatternImageChange = (newUrl: string) => {
        onStateChange({ ...appState, patternImage: newUrl });
        addImagesToGallery([newUrl]);
    };
    const handlePatternImage2Change = (newUrl: string) => {
        onStateChange({ ...appState, patternImage2: newUrl });
        addImagesToGallery([newUrl]);
    };
    const handleGeneratedImageChange = (newUrl: string) => {
        const newHistorical = [newUrl, ...appState.historicalImages];
        onStateChange({ ...appState, stage: 'results', generatedImage: newUrl, historicalImages: newHistorical });
        addImagesToGallery([newUrl]);
    };

    const handleOptionChange = (field: keyof PatternDesignerState['options'], value: string | boolean | number) => {
        onStateChange({ ...appState, options: { ...appState.options, [field]: value } });
    };

    const executeGeneration = async () => {
        if (!appState.clothingImage || !appState.patternImage) return;
        onStateChange({ ...appState, stage: 'generating', error: null });
        try {
            const resultUrl = await applyPatternToClothing(
                appState.clothingImage, 
                appState.patternImage, 
                appState.patternImage2,
                appState.options
            );
            const settingsToEmbed = {
                viewId: 'pattern-designer',
                state: { ...appState, stage: 'configuring', generatedImage: null, historicalImages: [], error: null },
            };
            const urlWithMetadata = await embedJsonInPng(resultUrl, settingsToEmbed, settings.enableImageMetadata);
            
            const newHistoricalImages = [urlWithMetadata, ...appState.historicalImages];

            onStateChange({ ...appState, stage: 'results', generatedImage: urlWithMetadata, historicalImages: newHistoricalImages });
            addImagesToGallery([urlWithMetadata]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            onStateChange({ ...appState, stage: 'results', error: errorMessage });
        }
    };
    
    const handleRegeneration = async (prompt: string) => {
        if (!appState.generatedImage) return;
        onStateChange({ ...appState, stage: 'generating', error: null });
        try {
            const resultUrl = await editImageWithPrompt(appState.generatedImage, prompt);
            const settingsToEmbed = {
                viewId: 'pattern-designer',
                state: { ...appState, stage: 'configuring', generatedImage: null, historicalImages: [], error: null },
            };
            const urlWithMetadata = await embedJsonInPng(resultUrl, settingsToEmbed, settings.enableImageMetadata);

            const newHistoricalImages = [urlWithMetadata, ...appState.historicalImages];

            onStateChange({ ...appState, stage: 'results', generatedImage: urlWithMetadata, historicalImages: newHistoricalImages });
            addImagesToGallery([urlWithMetadata]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            onStateChange({ ...appState, stage: 'results', error: errorMessage });
        }
    };
    
    const handleBackToOptions = () => {
        onStateChange({ ...appState, stage: 'configuring', error: null });
    };

    const handleDownloadAll = () => {
        const inputImages: ImageForZip[] = [];
        if (appState.clothingImage) {
            inputImages.push({ url: appState.clothingImage, filename: 'trang-phuc-goc', folder: 'input' });
        }
        if (appState.patternImage) {
            inputImages.push({ url: appState.patternImage, filename: 'hoa-tiet-goc-1', folder: 'input' });
        }
         if (appState.patternImage2) {
            inputImages.push({ url: appState.patternImage2, filename: 'hoa-tiet-goc-2', folder: 'input' });
        }
        
        processAndDownloadAll({
            inputImages,
            historicalImages: appState.historicalImages,
            videoTasks,
            zipFilename: 'ket-qua-thiet-ke-hoa-tiet.zip',
            baseOutputFilename: 'thiet-ke-hoa-tiet',
        });
    };

    const Uploader = ({ id, onUpload, caption, description, currentImage, onImageChange, placeholderType, cardType }: any) => (
        <div className="flex flex-col items-center gap-4">
            <label htmlFor={id} className="cursor-pointer group transform hover:scale-105 transition-transform duration-300">
                <ActionablePolaroidCard
                    type={currentImage ? cardType : 'uploader'}
                    caption={caption}
                    status="done"
                    mediaUrl={currentImage || undefined}
                    placeholderType={placeholderType}
                    onClick={currentImage ? () => openLightbox(lightboxImages.indexOf(currentImage)) : undefined}
                    onImageChange={onImageChange}
                />
            </label>
            <input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={onUpload} />
            {description && <p className="base-font font-bold text-neutral-300 text-center max-w-xs text-md">{description}</p>}
        </div>
    );

    const isLoading = appState.stage === 'generating';

    return (
        <div className="flex flex-col items-center justify-center w-full h-full flex-1 min-h-0">
            <AnimatePresence>
                {(appState.stage === 'idle' || appState.stage === 'configuring') && (<AppScreenHeader {...headerProps} />)}
            </AnimatePresence>
            
            {/* IDLE STAGE - updated logic */}
            {appState.stage === 'idle' && (
                <div className="w-full overflow-x-auto pb-4">
                    <motion.div
                        className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-8 w-full md:w-max mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Uploader id="clothing-upload" onUpload={handleClothingImageUpload} onImageChange={handleClothingImageChange} caption={uploaderCaptionClothing} description={uploaderDescriptionClothing} currentImage={appState.clothingImage} placeholderType="clothing" cardType="content-input" />
                        <Uploader id="pattern-upload" onUpload={handlePatternImageUpload} onImageChange={handlePatternImageChange} caption={uploaderCaptionPattern1} description={uploaderDescriptionPattern1} currentImage={appState.patternImage} placeholderType="style" cardType="style-input" />
                        
                        <AnimatePresence>
                            {appState.patternImage && (
                                <motion.div
                                    key="pattern2-uploader"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                >
                                    <Uploader id="pattern2-upload" onUpload={handlePatternImage2Upload} onImageChange={handlePatternImage2Change} caption={uploaderCaptionPattern2} description={uploaderDescriptionPattern2} currentImage={appState.patternImage2} placeholderType="style" cardType="style-input" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
            
            {/* CONFIGURING STAGE - updated logic */}
            {appState.stage === 'configuring' && appState.clothingImage && appState.patternImage && (
                <motion.div className="flex flex-col items-center gap-8 w-full max-w-screen-2xl py-6 overflow-y-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 w-full md:w-max mx-auto px-4">
                            <ActionablePolaroidCard type="content-input" mediaUrl={appState.clothingImage} caption={t('patternDesigner_clothingCaption')} status="done" onClick={() => appState.clothingImage && openLightbox(lightboxImages.indexOf(appState.clothingImage))} onImageChange={handleClothingImageChange} />
                            <ActionablePolaroidCard type="style-input" mediaUrl={appState.patternImage} caption={t('patternDesigner_pattern1Caption')} status="done" onClick={() => appState.patternImage && openLightbox(lightboxImages.indexOf(appState.patternImage))} onImageChange={handlePatternImageChange} />
                            {appState.patternImage2 && (
                                <ActionablePolaroidCard type="style-input" caption={t('patternDesigner_pattern2Caption')} status="done" mediaUrl={appState.patternImage2} placeholderType="style" onImageChange={handlePatternImage2Change} onClick={() => openLightbox(lightboxImages.indexOf(appState.patternImage2!))}/>
                            )}
                        </div>
                    </div>
                    
                    <OptionsPanel className="max-w-4xl">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 border-b border-yellow-400/20 pb-2">
                                <input
                                    type="checkbox"
                                    id="use-basic-options"
                                    checked={appState.options.useBasicOptions}
                                    onChange={(e) => handleOptionChange('useBasicOptions', e.target.checked)}
                                    className="h-4 w-4 rounded border-neutral-500 bg-neutral-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-neutral-800"
                                />
                                <label htmlFor="use-basic-options" className="base-font font-bold text-2xl text-yellow-400 cursor-pointer">
                                    {t('patternDesigner_optionsTitle')}
                                </label>
                            </div>
                            <AnimatePresence>
                                {appState.options.useBasicOptions && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }} 
                                        exit={{ opacity: 0, height: 0 }} 
                                        className="overflow-hidden space-y-4 pt-2"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <SearchableSelect
                                                id="applyMode"
                                                label={t('patternDesigner_applyModeLabel')}
                                                options={APPLY_MODE_OPTIONS}
                                                value={appState.options.applyMode}
                                                onChange={(value) => handleOptionChange('applyMode', value)}
                                                placeholder={t('common_auto')}
                                            />
                                            <div>
                                                <label htmlFor="aspect-ratio-pattern" className="block text-left base-font font-bold text-lg text-neutral-200 mb-2">{t('common_aspectRatio')}</label>
                                                <select id="aspect-ratio-pattern" value={appState.options.aspectRatio} onChange={(e) => handleOptionChange('aspectRatio', e.target.value)} className="form-input">
                                                    {ASPECT_RATIO_OPTIONS.map((opt:string) => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <Slider
                                            label={t('patternDesigner_patternScaleLabel')}
                                            options={PATTERN_SCALE_LEVELS}
                                            value={PATTERN_SCALE_LEVELS[appState.options.patternScale]}
                                            onChange={(value) => handleOptionChange('patternScale', PATTERN_SCALE_LEVELS.indexOf(value))}
                                        />
                                        <div className="flex items-center pt-2">
                                            <input 
                                                type="checkbox" 
                                                id="change-object-color" 
                                                checked={appState.options.changeObjectColor} 
                                                onChange={(e) => handleOptionChange('changeObjectColor', e.target.checked)}
                                                className="h-4 w-4 rounded border-neutral-500 bg-neutral-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-neutral-800"
                                            />
                                            <label htmlFor="change-object-color" className="ml-3 block text-sm font-medium text-neutral-300">
                                            {t('patternDesigner_changeObjectColor')}
                                            </label>
                                        </div>
                                        <AnimatePresence>
                                            {appState.options.changeObjectColor && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                >
                                                    <ColorPickerInput
                                                        value={appState.options.objectColorToChange}
                                                        onChange={c => handleOptionChange('objectColorToChange', c)}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <div className="flex items-center pt-2 border-t border-neutral-700/50">
                                            <input type="checkbox" id="remove-watermark-pattern" checked={appState.options.removeWatermark} onChange={(e) => handleOptionChange('removeWatermark', e.target.checked)} className="h-4 w-4 rounded border-neutral-500 bg-neutral-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-neutral-800" aria-label={t('common_removeWatermark')} />
                                            <label htmlFor="remove-watermark-pattern" className="ml-3 block text-sm font-medium text-neutral-300">{t('common_removeWatermark')}</label>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-4 border-t border-yellow-400/20 pt-4 mt-4">
                            <div className="flex items-center gap-3 border-b border-yellow-400/20 pb-2">
                                <input
                                    type="checkbox"
                                    id="use-advanced-options"
                                    checked={appState.options.useAdvancedOptions}
                                    onChange={(e) => handleOptionChange('useAdvancedOptions', e.target.checked)}
                                    className="h-4 w-4 rounded border-neutral-500 bg-neutral-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-neutral-800"
                                />
                                <label htmlFor="use-advanced-options" className="base-font font-bold text-2xl text-yellow-400 cursor-pointer">
                                    {t('patternDesigner_advancedOptionsTitle')}
                                </label>
                            </div>
                            <AnimatePresence>
                                {appState.options.useAdvancedOptions && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: 'auto' }} 
                                        exit={{ opacity: 0, height: 0 }} 
                                        className="overflow-hidden space-y-4 pt-2"
                                    >
                                        <SearchableSelect
                                            id="productType"
                                            label={t('patternDesigner_productTypeLabel')}
                                            options={PRODUCT_TYPE_OPTIONS}
                                            value={appState.options.productType}
                                            onChange={(value) => handleOptionChange('productType', value)}
                                            placeholder={t('common_auto')}
                                        />
                                        <div>
                                            <label htmlFor="notes" className="block text-left base-font font-bold text-lg text-neutral-200 mb-2">{t('patternDesigner_notesLabel')}</label>
                                            <textarea
                                                id="notes"
                                                value={localNotes}
                                                onChange={(e) => setLocalNotes(e.target.value)}
                                                onBlur={() => { if (localNotes !== appState.options.notes) { handleOptionChange('notes', localNotes); } }}
                                                placeholder={t('patternDesigner_notesPlaceholder')}
                                                className="form-input h-24"
                                                rows={3}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {appState.options.useAdvancedOptions && appState.options.productType === 'Áo thun' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }} 
                                    className="overflow-hidden space-y-4 border-t-2 border-yellow-400/30 pt-4 mt-4"
                                >
                                    <h3 className="base-font font-bold text-xl text-yellow-300 text-center">{t('patternDesigner_tshirtOptionsTitle')}</h3>
                                    
                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-lg text-neutral-200">{t('patternDesigner_colorSectionTitle')}</h4>
                                        <div className="flex flex-wrap justify-around items-center bg-black/20 p-3 rounded-lg gap-4">
                                            <ColorInput label={t('patternDesigner_colorBody')} value={appState.options.tshirtColorBody} onChange={c => handleOptionChange('tshirtColorBody', c)} />
                                            <ColorInput label={t('patternDesigner_colorLeftSleeve')} value={appState.options.tshirtColorLeftSleeve} onChange={c => handleOptionChange('tshirtColorLeftSleeve', c)} />
                                            <ColorInput label={t('patternDesigner_colorRightSleeve')} value={appState.options.tshirtColorRightSleeve} onChange={c => handleOptionChange('tshirtColorRightSleeve', c)} />
                                            <ColorInput label={t('patternDesigner_colorCollar')} value={appState.options.tshirtColorCollar} onChange={c => handleOptionChange('tshirtColorCollar', c)} />
                                            <ColorInput label={t('patternDesigner_colorHem')} value={appState.options.tshirtColorHem} onChange={c => handleOptionChange('tshirtColorHem', c)} />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-lg text-neutral-200">{t('patternDesigner_printSectionTitle')}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <SearchableSelect id="tshirtPrintStyle" label={t('patternDesigner_printStyleLabel')} options={t('patternDesigner_printStyleOptions')} value={appState.options.tshirtPrintStyle} onChange={(v) => handleOptionChange('tshirtPrintStyle', v)} />
                                            <div>
                                                <label htmlFor="tshirtPrintPosition" className="block text-left base-font font-bold text-lg text-neutral-200 mb-2">{t('patternDesigner_printPositionLabel')}</label>
                                                <textarea id="tshirtPrintPosition" value={appState.options.tshirtPrintPosition} onChange={(e) => handleOptionChange('tshirtPrintPosition', e.target.value)} placeholder={t('patternDesigner_printPositionPlaceholder')} className="form-input h-24" rows={2}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-lg text-neutral-200">{t('patternDesigner_fitStyleSectionTitle')}</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                            <SearchableSelect id="tshirtFit" label={t('patternDesigner_fitLabel')} options={t('patternDesigner_fitOptions')} value={appState.options.tshirtFit} onChange={v => handleOptionChange('tshirtFit', v)} />
                                            <SearchableSelect id="tshirtCollarStyle" label={t('patternDesigner_collarLabel')} options={t('patternDesigner_collarOptions')} value={appState.options.tshirtCollarStyle} onChange={v => handleOptionChange('tshirtCollarStyle', v)} />
                                            <SearchableSelect id="tshirtSleeveStyle" label={t('patternDesigner_sleeveLabel')} options={t('patternDesigner_sleeveOptions')} value={appState.options.tshirtSleeveStyle} onChange={v => handleOptionChange('tshirtSleeveStyle', v)} />
                                            <SearchableSelect id="tshirtLength" label={t('patternDesigner_lengthLabel')} options={t('patternDesigner_lengthOptions')} value={appState.options.tshirtLength} onChange={v => handleOptionChange('tshirtLength', v)} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-lg text-neutral-200">{t('patternDesigner_fabricSectionTitle')}</h4>
                                        <SearchableSelect id="tshirtFabric" label={t('patternDesigner_fabricLabel')} options={t('patternDesigner_fabricOptions')} value={appState.options.tshirtFabric} onChange={v => handleOptionChange('tshirtFabric', v)} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-yellow-400/20 mt-4">
                            <button onClick={onReset} className="btn btn-secondary">{t('common_changeImage')}</button>
                            <button onClick={executeGeneration} className="btn btn-primary" disabled={isLoading}>{isLoading ? t('patternDesigner_creating') : t('patternDesigner_createButton')}</button>
                        </div>
                    </OptionsPanel>
                </motion.div>
            )}
            
            {(appState.stage === 'generating' || appState.stage === 'results') && (
                <ResultsView
                    stage={appState.stage}
                    originalImage={appState.clothingImage}
                    generatedImage={appState.generatedImage}
                    onOriginalClick={() => appState.clothingImage && openLightbox(lightboxImages.indexOf(appState.clothingImage))}
                    error={appState.error}
                    isMobile={isMobile}
                    actions={
                        <>
                            {appState.generatedImage && !appState.error && (<button onClick={handleDownloadAll} className="btn btn-primary">{t('common_downloadAll')}</button>)}
                            <button onClick={handleBackToOptions} className="btn btn-secondary">{t('common_editOptions')}</button>
                            <button onClick={onReset} className="btn btn-secondary !bg-red-500/20 !border-red-500/80 hover:!bg-red-500 hover:!text-white">{t('common_startOver')}</button>
                        </>
                    }
                >
                    {appState.patternImage && (
                        <motion.div key="pattern" className="w-full md:w-auto flex-shrink-0" whileHover={{ scale: 1.05, zIndex: 10 }} transition={{ duration: 0.2 }}>
                            <ActionablePolaroidCard type="style-input" caption={t('patternDesigner_pattern1Caption')} status="done" mediaUrl={appState.patternImage} isMobile={isMobile} onClick={() => appState.patternImage && openLightbox(lightboxImages.indexOf(appState.patternImage))} onImageChange={handlePatternImageChange} />
                        </motion.div>
                    )}
                    {appState.patternImage2 && (
                        <motion.div key="pattern2" className="w-full md:w-auto flex-shrink-0" whileHover={{ scale: 1.05, zIndex: 10 }} transition={{ duration: 0.2 }}>
                            <ActionablePolaroidCard type="style-input" caption={t('patternDesigner_pattern2Caption')} status="done" mediaUrl={appState.patternImage2} isMobile={isMobile} onClick={() => appState.patternImage2 && openLightbox(lightboxImages.indexOf(appState.patternImage2))} onImageChange={handlePatternImage2Change} />
                        </motion.div>
                    )}
                    <motion.div className="w-full md:w-auto flex-shrink-0" key="generated-pattern" initial={{ opacity: 0, scale: 0.5, y: 100 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15, delay: 0.2 }} whileHover={{ scale: 1.05, zIndex: 10 }}>
                        <ActionablePolaroidCard
                            type="output"
                            caption={t('common_result')}
                            status={isLoading ? 'pending' : (appState.error ? 'error' : 'done')}
                            mediaUrl={appState.generatedImage ?? undefined} error={appState.error ?? undefined}
                            onImageChange={handleGeneratedImageChange}
                            onRegenerate={handleRegeneration}
                            onGenerateVideoFromPrompt={(prompt) => appState.generatedImage && generateVideo(appState.generatedImage, prompt)}
                            regenerationTitle={t('common_regenTitle')}
                            regenerationDescription={t('common_regenDescription')}
                            regenerationPlaceholder={t('patternDesigner_regenPlaceholder')}
                            onClick={!appState.error && appState.generatedImage ? () => openLightbox(lightboxImages.indexOf(appState.generatedImage!)) : undefined}
                            isMobile={isMobile}
                        />
                    </motion.div>
                </ResultsView>
            )}

            <Lightbox images={lightboxImages} selectedIndex={lightboxIndex} onClose={closeLightbox} onNavigate={navigateLightbox} />
        </div>
    );
};

export default PatternDesigner;