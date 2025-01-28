import React from 'react';

const TelegramSVG = ({ color }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2051_266)">
            <path style={{ transition: 'fill 250ms ease-in-out' }} fillRule="evenodd" clipRule="evenodd" d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48ZM29.6804 36.0278L23.6827 31.5966L20.7996 34.4L20.7725 34.4264C20.4501 34.7403 20.1833 35 19.5996 35L20.0086 28.8818L31.1373 18.839C31.6258 18.4055 31.0307 18.1941 30.3823 18.5873L16.6477 27.2523L10.7151 25.4006C9.43393 25.0084 9.42473 24.128 11.0027 23.495L34.1207 14.5808C35.1766 14.1015 36.1957 14.8344 35.7926 16.4505L31.8556 35.0031C31.5807 36.3215 30.7841 36.6368 29.6804 36.0278Z" fill={color}/>
        </g>
        <defs>
            <clipPath id="clip0_2051_266">
                <rect width="48" height="48" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

export default TelegramSVG;
