import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DateTime } from 'luxon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commonHelpers = {

    getCurrentDate() {
        return DateTime.utc().toISODate();
    },

    getCurrentDateTime() {
        return DateTime.utc().toISO();
    },

    normalizeDateInput(value) {

        // DATE-ONLY
        if (!value.includes('T')) {
            return DateTime.fromISO(value).toISODate();
        }
        // DATETIME
        return DateTime.fromISO(value, { zone: 'utc' }).toISO();

    },

    ERROR_LOG_MSG(time, statusCode, message) {

        return (
`
==============================
Time: ${time}
StatusCode: ${statusCode}
Message: ${message}
==============================\n
`
        );

    },

    logError(err) {
        try {

            const logDir = path.join(__dirname, "../../error_logs");

            if (!fs.existsSync(logDir)) {
                fs.mkdirSync(logDir, { recursive: true });
            }

            const logFile = path.join(logDir, `${this.getCurrentDate()}.txt`);

            const time = `UTC-${DateTime.utc().toFormat('HH:mm:ss')} || LOCAL-${DateTime.local().toFormat('HH:mm:ss')}`;

            const errorMessage = this.ERROR_LOG_MSG(time, err.statusCode, err.message);

            fs.appendFileSync(logFile, errorMessage, "utf8");

        } catch (loggingError) {
            console.error("❌ Error while logging error: ", loggingError);
        }
    }

}

export default commonHelpers;