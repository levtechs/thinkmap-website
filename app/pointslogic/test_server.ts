const TestServer = async (): Promise<boolean> => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!BACKEND_URL) {
        throw new Error("Environment variable NEXT_PUBLIC_BACKEND_URL is not set.");
    }

    try {
        const response = await fetch(BACKEND_URL, { method: 'GET' });
        return response.ok; // true if status is 2xx
    } catch (error) {
        console.warn("Server test failed:", error);
        return false;
    }
};

export default TestServer