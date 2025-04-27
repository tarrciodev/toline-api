import { isBefore } from "date-fns";

export function isOutdated(date: Date) {
    const agora = new Date();
    return isBefore(date, agora);
}
