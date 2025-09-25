/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const LoadingSpinnerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const ErrorIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PlaceholderPersonIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const PlaceholderArchitectureIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

export const PlaceholderClothingIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
);

export const PlaceholderMagicIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const PlaceholderStyleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
    </svg>
);

export const FullscreenIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
    </svg>
);

export const EditorIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
    </svg>
);

export const SwapIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12L4 13m3 3l3-3m6 0v12m0-12l3 3m-3-3l-3 3" />
    </svg>
);

export const GalleryIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const WebcamIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
        <circle fill="none" cx="16" cy="14" r="11"/>
        <circle fill="none" cx="16" cy="14" r="5"/>
        <circle fill="none" cx="16" cy="14" r="1"/>
        <path fill="none" d="M21.8,23.3l2.4,2.2c1.4,1.2,0.5,3.5-1.3,3.5H9.2c-1.8,0-2.7-2.2-1.3-3.5l2.4-2.2"/>
        <circle fill="currentColor" stroke="none" cx="22" cy="9" r="1"/>
    </svg>
);

export const RegenerateIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.899 2.186l-1.42.71a5.002 5.002 0 00-8.479-1.554H10a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm12 14a1 1 0 01-1-1v-2.101a7.002 7.002 0 01-11.899-2.186l1.42-.71a5.002 5.002 0 008.479 1.554H10a1 1 0 110-2h6a1 1 0 011 1v6a1 1 0 01-1 1z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const CloudUploadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const BackIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-6-6m0 0l6-6m-6 6h13.5a5.5 5.5 0 010 11H10" />
    </svg>
);

export const ForwardIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H6.5a5.5 5.5 0 000 11H10" />
    </svg>
);

export const LayerComposerIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.25l-10 5 10 5 10-5-10-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 11.25l10 5 10-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 16.25l10 5 10-5" />
    </svg>
);

export const EllipsisIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

export const LogoutIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

export const LayoutIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const BeforeAfterIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M2 4h9v1H3v15h8v1H2zm10 19h1V2h-1zM8.283 10.283l-.566-.566L4.934 12.5l2.783 2.783.566-.566L6.566 13H11v-1H6.566zM14 12h4.08l-1.54-1.54.92-.92 2.96 2.96-2.96 2.96-.92-.92L18.08 13H14v8h9V4h-9z"/>
        <path fill="none" d="M0 0h24v24H0z"/>
    </svg>
);

export const CropIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path d="M6.13 1L6 16a2 2 0 0 0 2 2h15" /><path d="M1 6.13L16 6a2 2 0 0 1 2 2v15" />
    </svg>
);

export const PerspectiveCropIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 1.29a1 1 0 00.22 0L21 8M3 16l7.89-1.29a1 1 0 01.22 0L21 16M7 21V3M17 21V3" />
    </svg>
);

export const RotateIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l6 6m0 0l6-6m-6 6V9a6 6 0 00-12 0v3" />
    </svg>
);

export const FlipHorizontalIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7l-4 4-4-4m8 10l-4-4-4 4" />
    </svg>
);

export const FlipVerticalIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12L4 13m3 3l3-3m7-3v12m0-12l3 3m-3-3l-3 3" />
    </svg>
);

export const SelectionIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
        <path d="M4.495 11.05a8.186 8.186 0 0 0 .695-3.067c.001-.027.006-.052.007-.078l.965.41a9.254 9.254 0 0 1-.648 2.888zm14.087-5.128l-.81.61a12.73 12.73 0 0 1 1.272 1.98l1-.307a13.602 13.602 0 0 0-1.462-2.283zm-4.224-2.13a8.128 8.128 0 0 1 2.02 1.285l.825-.62a9.226 9.226 0 0 0-2.6-1.648zm-4.541-.355a6.581 6.581 0 0 1 1.748-.237 6.919 6.919 0 0 1 .864.063l.245-.985a7.967 7.967 0 0 0-1.109-.078 7.501 7.501 0 0 0-2.023.276zM5.873 18.574a3.676 3.676 0 0 1-2.13-1.012L2.66 17.8a4.49 4.49 0 0 0 3.103 1.776zm-2.861-2.9c-.003-.058-.012-.11-.012-.17 0-.594.314-1.01.917-1.756.168-.208.349-.438.53-.682l-1.13-.169A4.135 4.135 0 0 0 2 15.504c0 .136.012.261.022.389zM6.534 6.3a4.422 4.422 0 0 1 1.458-1.97l-.29-1.016a5.53 5.53 0 0 0-2.078 2.599zm15.084 7.022a16.977 16.977 0 0 0-.788-3.266l-.974.299a16.1 16.1 0 0 1 .587 2.11zM18.757 17l2.189 4.515-2.894 1.456-2.266-4.621L13 22.17V9.51L23.266 17zm-1.597-1h3.038L14 11.478v7.624l1.954-2.68 2.552 5.201 1.11-.559zM11 18.854a8.011 8.011 0 0 0-2.454-.391c-.229 0-.444.011-.651.026l-.111 1.013c.243-.022.493-.039.763-.039a7.2 7.2 0 0 1 2.453.453z" />
        <path fill="none" d="M0 0h24v24H0z" />
    </svg>
);

export const MarqueeIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <g transform="translate(2 2)">
            <path d="m.5 3.5v-1c0-1.1045695.8954305-2 2-2h1m0 16h-1c-1.1045695 0-2-.8954305-2-2v-1m16-10v-1c0-1.1045695-.8954305-2-2-2h-1m0 16h1c1.1045695 0 2-.8954305 2-2v-1"></path>
            <path d="m5.5.5h2"></path>
            <path d="m9.5.5h2"></path>
            <path d="m5.5 16.5h2"></path>
            <path d="m9.5 16.5h2"></path>
            <path d="m16.5 5.498v2.002"></path>
            <path d="m16.5 9.498v2.002"></path>
            <path d="m.5 5.498v2.002"></path>
            <path d="m.5 9.498v2.002"></path>
        </g>
    </svg>
);

export const EllipseIcon: React.FC<IconProps> = (props) => (
    <svg fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.585 511.585" xmlSpace="preserve" {...props}>
        <g> <g> <g>
            <path d="M201.129,462.676c-6.258-1.647-12.428-3.578-18.494-5.785c-11.072-4.029-23.313,1.681-27.342,12.753 c-4.029,11.072,1.681,23.313,12.753,27.342c7.289,2.652,14.704,4.973,22.224,6.952c11.394,2.999,23.062-3.807,26.06-15.201 S212.523,465.675,201.129,462.676z"></path>
            <path d="M115.642,417.372c-4.882-4.247-9.571-8.714-14.05-13.385c-8.155-8.504-21.66-8.786-30.163-0.631 c-8.504,8.155-8.786,21.66-0.631,30.163c5.369,5.599,10.989,10.953,16.842,16.044c8.889,7.733,22.364,6.795,30.097-2.094 S124.532,425.105,115.642,417.372z"></path>
            <path d="M161.526,40.236c-5.67-10.328-18.639-14.105-28.967-8.435c-6.804,3.735-13.435,7.779-19.87,12.115 c-9.771,6.584-12.354,19.843-5.769,29.613c6.584,9.771,19.843,12.354,29.613,5.769c5.364-3.615,10.889-6.984,16.558-10.096 C163.419,63.533,167.196,50.564,161.526,40.236z"></path>
            <path d="M51.938,320.113c-3.517-11.245-15.484-17.51-26.729-13.993c-11.245,3.517-17.51,15.484-13.993,26.729 c2.321,7.42,4.978,14.722,7.962,21.885c4.531,10.876,17.021,16.02,27.897,11.489c10.876-4.531,16.02-17.021,11.489-27.897 C56.081,332.363,53.87,326.287,51.938,320.113z"></path>
            <path d="M456.784,185.235c2.151,6.086,4.025,12.274,5.615,18.549c2.893,11.421,14.498,18.335,25.919,15.441 c11.421-2.893,18.334-14.498,15.441-25.919c-1.91-7.54-4.162-14.977-6.747-22.29c-3.927-11.109-16.115-16.931-27.224-13.004 C458.679,161.938,452.857,174.127,456.784,185.235z"></path>
            <path d="M42.63,243.534c0.384-6.483,1.058-12.916,2.016-19.282c2.115-11.369-5.118-22.69-16.487-24.805 c-11.369-2.115-22.69,5.118-24.805,16.487c-1.127,6.046-1.914,12.162-2.338,18.324c-0.638,9.278,6.233,17.372,15.511,18.01 c0.505,0.035,1.008,0.052,1.508,0.052c8.73,0,16.126-6.421,16.941-15.022C35.03,246.305,42.63,243.534,42.63,243.534z"></path>
            <path d="M480.932,102.163c-8.504-8.155-21.66-8.786-30.163-0.631c-4.479,4.671-8.73,9.577-12.723,14.697 c-7.276,9.324-5.83,22.618,3.494,29.894c3.92,3.057,8.448,4.646,13.004,4.646c6.804,0,13.435-3.084,17.801-9.157 c4.882-6.71,9.394-13.67,13.504-20.843C489.164,112.607,488.087,109.288,480.932,102.163z"></path>
            <path d="M309.287,15.225c11.394-2.999,18.201-14.667,15.201-26.06c-2.31-8.795-9.358-14.936-17.778-15.895 c-8.42-0.96-16.721-1.218-24.888-0.757c-11.758,0.67-20.916,10.643-20.246,22.401c0.638,11.137,9.796,19.957,20.92,19.957 c0.043,0,0.086,0,0.129,0c9.192-0.516,18.211-1.681,27.022-3.488C309.115,15.281,309.201,15.253,309.287,15.225z"></path>
            <path d="M428.455,42.946c10.849-4.803,15.65-17.278,10.847-28.127c-4.803-10.849-17.278-15.65-28.127-10.847 c-7.289,3.228-14.437,6.811-21.408,10.72c-10.849,6.113-14.814,19.168-8.701,29.989c4.372,7.761,12.399,11.857,20.617,11.857 c3.578,0,7.185-0.988,10.463-3.028C419.435,50.311,424.314,46.728,428.455,42.946z"></path>
            <path d="M255.792,0C114.739,0,0,114.739,0,255.792s114.739,255.792,255.792,255.792s255.792-114.739,255.792-255.792 S396.846,0,255.792,0z M255.792,471.585C136.223,471.585,40,375.361,40,255.792S136.223,40,255.792,40s215.792,96.223,215.792,215.792 S375.361,471.585,255.792,471.585z"></path>
        </g> </g> </g>
    </svg>
);

export const PenIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19.529 6.264a2.247 2.247 0 0 0-3.178 0L3.81 18.805a2.24 2.24 0 0 0-.658 1.588v.02a2.24 2.24 0 0 0 .657 1.588l.01.01a2.24 2.24 0 0 0 1.588.658h.02a2.24 2.24 0 0 0 1.588-.657L19.53 8.442a2.247 2.247 0 0 0 0-3.178zM18.82 5.556a1.248 1.248 0 0 1 1.766 1.766l-1.06 1.06-1.767-1.767zM15.464 12L5.26 2.22l-1.04.44L14 13.048zm-1.767 1.768L5.383 5.453l-1.06 1.061 8.314 8.314zm-1.768 1.768l-6.25-6.25L4.62 10.347l6.25 6.25zM6.444 19.53a1.24 1.24 0 0 1-1.766-1.766l1.06-1.06 1.767 1.767z" />
    </svg>
);

export const BrushIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20.57 4.23a1 1 0 0 0-1.41 0l-4.59 4.58a1 1 0 0 0 0 1.42l4.58 4.58a1 1 0 0 0 1.42 0l4.59-4.58a1 1 0 0 0 0-1.42z" />
        <path d="M19.71 15.12a1 1 0 0 1-1.41-1.41L19.59 12l-.29-.29a1 1 0 0 0-1.42 1.42l.29.29L17 14.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29L13 18.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l1.3 1.29-1.29 1.29a1 1 0 1 0 1.41 1.41l1.29-1.29 1.3 1.29a1 1 0 0 0 1.41-1.41l-1.29-1.3L18.3 16.53l.29.29a1 1 0 0 0 1.41-1.41l-.29-.29z" />
        <path d="M4 19a1 1 0 0 0 1.6.8l2.7-2.7a3.46 3.46 0 0 1 0-4.9L4 8a1 1 0 0 0-.9-1.6 6.88 6.88 0 0 0 0 13.2A1 1 0 0 0 4 19z" />
    </svg>
);

export const EraserIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.3,7.66a2.5,2.5,0,0,0-3.54,0l-5.8,5.8a1.2,1.2,0,0,0,0,1.7l5.8,5.8a2.5,2.5,0,0,0,3.54-3.54L17.76,14l3.54-3.54A2.5,2.5,0,0,0,21.3,7.66Z" />
        <path d="M6.49,20.49l-2-2a2.5,2.5,0,0,1,0-3.54L9.17,10.34,13.66,14.83,6.49,22A2.53,2.53,0,0,1,6.49,20.49Z" />
        <path d="M12.12,6.76,2.29,16.59a2.5,2.5,0,0,0,0,3.54l2,2a2.5,2.5,0,0,0,3.54,0L18.24,11.72Z" />
    </svg>
);

export const ColorPickerIcon: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
        <path d="M19.4 15.25a2.83 2.83 0 0 1-4 0l-1.24-1.24a1 1 0 0 1 0-1.41l.12-.13a1 1 0 0 1 1.41 0l1.25 1.25a.81.81 0 0 0 1.14 0l1.25-1.25a1 1 0 0 1 1.41 0l.12.13a1 1 0 0 1 0 1.41zM15.86 19.45a1 1 0 0 1-1.41 0l-6.37-6.36a1 1 0 0 1 0-1.42L12.63 7.12a5.2 5.2 0 0 1 7.23 0l.12.12a5.2 5.2 0 0 1 0 7.23zm-5-10.74L8.76 6.6a3.29 3.29 0 0 0-4.63 0l-.13.12a3.29 3.29 0 0 0 0 4.64l2.1 2.1a1 1 0 0 1 0 1.41l-1.24 1.24a1 1 0 0 1-1.41-1.41l1.24-1.24a3 3 0 0 0 0-4.24L2.68 8.16a1.29 1.29 0 0 1 0-1.82l.12-.13a1.29 1.29 0 0 1 1.82 0l2.1 2.1a1 1 0 0 1 1.41 0l1.25-1.24a1 1 0 0 1 1.41 1.41z" />
    </svg>
);

export const InvertIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 0110.89-7.755 1 1 0 00.322-1.664 10.002 10.002 0 109.566 9.566 1 1 0 00-1.664.322A8 8 0 012 10z" clipRule="evenodd" />
    </svg>
);

export const MagicWandIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M3.103 2.247a.75.75 0 011.085.123l3.291 4.521.92-1.23a.75.75 0 011.185.88l-.92 1.23 3.291 4.521a.75.75 0 01-.88 1.185l-1.23-.92-4.521 3.291a.75.75 0 01-1.186-.88l1.23-.92L2.247 4.232a.75.75 0 01.123-1.085zM3.4 9.043l3.29-2.401.92 1.23a.75.75 0 11-1.186.88l-.92-1.23-3.29 2.4a.75.75 0 11-.88-1.186l1.186-.88z" />
        <path d="M11.53 10.47a.75.75 0 011.06 0l2.688 2.688a.75.75 0 01-1.06 1.06l-2.688-2.688a.75.75 0 010-1.06z" />
        <path d="M15.47 11.53a.75.75 0 011.06 0l2.688 2.688a.75.75 0 11-1.06 1.06l-2.688-2.688a.75.75 0 010-1.06zM11.53 14.47a.75.75 0 011.06 0l2.688 2.688a.75.75 0 11-1.06 1.06l-2.688-2.688a.75.75 0 010-1.06z" />
    </svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const CanvasIcon: React.FC<IconProps> = (props) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
// ADDED ICONS START HERE

export const DeleteIcon: React.FC<IconProps> = ({ strokeWidth = 1.5, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={strokeWidth} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const DuplicateIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

export const BakeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const MergeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 18v-5c0 -2.21 1.79 -4 4 -4h7" />
        <path d="M12 13l3 -3l-3 -3" />
        <path d="M4 6v5c0 2.21 1.79 4 4 4h7" />
    </svg>
);

export const AlignLeftIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V3M9 17V7h8v10H9z" />
    </svg>
);

export const AlignCenterIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3M7 17V7h10v10H7z" />
    </svg>
);

export const AlignRightIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21V3M15 17V7H7v10h8z" />
    </svg>
);

export const AlignTopIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18M7 9v8h10V9H7z" />
    </svg>
);

export const AlignMiddleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M7 7v10h10V7H7z" />
    </svg>
);

export const AlignBottomIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M7 15V7h10v8H7z" />
    </svg>
);

export const DistributeHorizontalIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 21V3m16 18V3M12 15V9h-2m4 0h-2" />
  </svg>
);

export const DistributeVerticalIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 4H3m18 16H3m-4-8h8m8 0h-8" />
  </svg>
);

export const DistributeHorizontalScaleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 19h18M8 19V5m8 14V5" />
  </svg>
);

export const DistributeVerticalScaleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18M19 3v18M19 8H5m14 8H5" />
  </svg>
);

export const AccordionArrowIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export const AddTextIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20h4m-2 0V4m0 0h2.5M9 4h-2.5M14 20h4m-2 0V4m0 0h2.5M16 4h-2.5" />
    </svg>
);

export const AddIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const VisibleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const HiddenIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const UnlockIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm8-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

export const DragHandleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const BoldIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9.25 3.5a.75.75 0 000 1.5h.5c1.128 0 2.083.822 2.231 1.9.22 1.56-.915 2.85-2.281 2.85H8.25a.75.75 0 000 1.5h1.45c.832 0 1.612.356 2.146.945.5.556.754 1.28.673 2.002-.103.913-.883 1.603-1.82 1.603h-1.4c-.991 0-1.827-.611-2.121-1.49a.75.75 0 00-1.358.58A3.996 3.996 0 008.25 16.5h1.4c1.802 0 3.21-1.32 3.328-3.003.13-1.862-.942-3.48-2.672-3.48H9.75V5h.5a.75.75 0 000-1.5h-.5z" />
    </svg>
);

export const ItalicIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M7.75 3a.75.75 0 000 1.5h1.259l-3.023 11H4.25a.75.75 0 000 1.5h6a.75.75 0 000-1.5H8.981l3.023-11h1.746a.75.75 0 000-1.5h-6z" />
    </svg>
);

export const UppercaseIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.433A3.251 3.251 0 0115.25 4h.5A2.25 2.25 0 0118 6.25v2.5a2.25 2.25 0 01-2.25 2.25h-1a.75.75 0 01-.75-.75V8.583A3.25 3.25 0 0112.75 8h-5.5A3.25 3.25 0 014 5.25v-.5A2.75 2.75 0 016.75 2H6V1.75A1.75 1.75 0 014.25 0h-1.5A1.75 1.75 0 001 1.75v16.5A1.75 1.75 0 002.75 20h1.5A1.75 1.75 0 006 18.25v-1.75h2.25A2.75 2.75 0 0011 13.75v-.433A3.251 3.251 0 019.75 14h-.5A2.25 2.25 0 017 11.75v-2.5A2.25 2.25 0 019.25 7h1a.75.75 0 01.75.75v2.167A3.25 3.25 0 0112.25 10h5.5A3.25 3.25 0 0121 12.75v.5A2.75 2.75 0 0118.25 16H19v1.75a1.75 1.75 0 01-1.75 1.75h-1.5a1.75 1.75 0 01-1.75-1.75V3.75zM12.75 6.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5z" clipRule="evenodd" />
    </svg>
);
// FIX: Add missing icons for ImageEditorCanvas toolbar
export const UndoIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
);
export const RedoIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" /></svg>
);
export const ZoomOutIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
);
export const ZoomInIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
);
export const HandIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11" /></svg>
);
// ADDED ICONS END HERE