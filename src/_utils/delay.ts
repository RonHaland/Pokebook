export async function delay(ms: number) {
    await new Promise<void>((res, rej) => {
        let ready = false;
        setTimeout(() => {
            ready = true;
            res();
        }, ms);
    });
}