export function generateTagFromEmail(email: string) {
    const tag = email.split("@")[0];
    return `@${tag}`;
}
