const handleManualSwitch = (newIndex, newDirection, setCurrentIndex, setDirection, startAutoSwitching, intervalRef) => {
    clearInterval(intervalRef.current);
    setCurrentIndex(newIndex);
    setDirection(newDirection);
    startAutoSwitching();
};

export const startAutoSwitching = (setCurrentIndex, setDirection, direction, totalSlides, intervalRef, switchingTime) => {
    intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
            if (direction === 'forward') {
                if (prevIndex === totalSlides - 1) {
                    setDirection('backward');
                    return prevIndex - 1;
                }
                return prevIndex + 1;
            } else {
                if (prevIndex === 0) {
                    setDirection('forward');
                    return prevIndex + 1;
                }
                return prevIndex - 1;
            }
        });
    }, switchingTime);
};

export const handleRightArrowClick = (currentIndex, direction, totalSlides, setCurrentIndex, setDirection, startAutoSwitching, intervalRef) => {
    if (direction === 'forward') {
        if (currentIndex === 0) {
            handleManualSwitch(currentIndex + 1, 'forward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        } else if (currentIndex === 1) {
            handleManualSwitch(currentIndex + 1, 'forward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        }
    } else if (direction === 'backward') {
        if (currentIndex === 0) {
            handleManualSwitch(currentIndex + 1, 'forward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        } else if (currentIndex === 1) {
            handleManualSwitch(currentIndex + 1, 'forward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        }
    }
};

export const handleLeftArrowClick = (currentIndex, direction, totalSlides, setCurrentIndex, setDirection, startAutoSwitching, intervalRef) => {
    if (direction === 'backward') {
        if (currentIndex === 1) {
            handleManualSwitch(currentIndex - 1, 'backward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        } else if (currentIndex === 2) {
            handleManualSwitch(currentIndex - 1, 'backward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        }
    } else if (direction === 'forward') {
        if (currentIndex === 1) {
            handleManualSwitch(currentIndex - 1, 'backward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        } else if (currentIndex === 2) {
            handleManualSwitch(currentIndex - 1, 'backward', setCurrentIndex, setDirection, startAutoSwitching, intervalRef);
        }
    }
};
