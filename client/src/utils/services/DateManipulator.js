class DateManipulator {
    constructor(locale = 'ru-RU', timeZone = 'Asia/Yekaterinburg') {
        this.locale = locale;
        this.timeZone = timeZone;
    }

    format(date, options = {}) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        const defaultOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: this.timeZone,
            ...options
        };

        return dateObj.toLocaleString(this.locale, defaultOptions);
    }

    formatRange(start, end) {
        const startDate = typeof start === 'string' ? new Date(start) : start;
        const endDate = typeof end === 'string' ? new Date(end) : end;

        return `${this.format(startDate)} — ${this.format(endDate)}`;
    }

    formatShortDate(date) {
        return this.format(date, {
            hour: undefined,
            minute: undefined
        });
    }

    formatTime(date) {
        return this.format(date, {
            day: undefined,
            month: undefined,
            year: undefined
        });
    }

    static isValid(date) {
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            return !isNaN(dateObj.getTime());
        } catch {
            return false;
        }
    }
}

const dateManipulator = new DateManipulator();
export default dateManipulator;