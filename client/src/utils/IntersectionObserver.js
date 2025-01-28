// utils/intersectionObserver.js
export const isDarkColor = (color) => {
    const rgb = color.match(/\d+/g);
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness < 128;
};

export const observeBackground = (ref, callback) => {
    const observer = new IntersectionObserver(
        ([entry]) => {
            const backgroundColor = window.getComputedStyle(entry.target.parentElement).backgroundColor;
            callback(isDarkColor(backgroundColor));
        },
        { threshold: [0.1] }
    );

    if (ref.current) {
        observer.observe(ref.current);
    }

    return () => {
        if (ref.current) {
            observer.unobserve(ref.current);
        }
    };
};
