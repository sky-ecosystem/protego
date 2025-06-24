import yoctoSpinner from "yocto-spinner";

/**
 * Creates a spinner that only shows if stdout is a TTY
 * @param {...any} args
 * @returns {import("yocto-spinner").Spinner}
 */
export function ttyOnlySpinner(...args) {
    // Only show a spinner if stdout is a TTY
    if (process.stdout.isTTY) {
        return yoctoSpinner(...args);
    }

    // If not a TTY, return a dummy spinner with empty chainable methods
    return {
        start() {
            return this;
        },
        success() {
            return this;
        },
        error() {
            return this;
        },
    };
}

/**
 * Converts a list of pause plans to a JSON string
 * @param {import("./fetchPausePlans").PausePlan[]} plans
 * @param {number} [spaces=0] Number of spaces for JSON.stringify
 * @returns {string}
 */
export function createJson(plans, spaces = 0) {
    return JSON.stringify(
        plans,
        (_, v) => (typeof v === "bigint" ? v.toString() : v),
        spaces,
    );
}

/**
 * Converts a Unix timestamp to human readable date
 * @param {bigint} timestamp Unix timestamp
 * @returns {string}
 */
export function formatDate(timestamp) {
    const date = new Date(Number(timestamp) * 1000);

    const datePart = date.toISOString().slice(2, 10);

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        hour12: false,
    };

    const timePart = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

    return `${datePart} ${timePart}`;
}

/**
 * Formats hex strings (address, bytes32) into a shorter format including just four initial and final chars
 * @param {string} hex Hex string
 * @param {number} first Number of chars to display in the beggining of formatted string
 * @param {number} last Number of chars to display at the end of formatted string
 * @returns {string}
 */
export function formatHex(hexStr, first = 4, last = 4) {
    if (typeof hexStr !== "string" || !hexStr.startsWith("0x")) {
        return hexStr;
    }

    if (first < 0 || last < 0) {
        return hexStr;
    }
    // Add 2 to account for the 0x prefix
    if (hexStr.length <= 2 + first + last) {
        return hexStr;
    }
    return `${hexStr.slice(0, 2 + first)}...${hexStr.slice(-last)}`;
}
