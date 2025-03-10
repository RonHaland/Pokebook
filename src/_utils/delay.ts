export async function delay(ms: number) {
    await new Promise<void>((res) => {
        setTimeout(() => {
            res();
        }, ms);
    });
}