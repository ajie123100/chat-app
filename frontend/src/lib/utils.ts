export function formatMessageTime(time: string): string {
    return new Date(time).toLocaleString("en-CN",{
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    })
}