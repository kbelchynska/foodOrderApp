import { useState, useCallback, useEffect } from "react";

const sendHttpRequest = async (url, config) => {
    const response = fetch(url, config);

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || "Something went wrong");
    }
    return resData;
};

export const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = useCallback(async () => {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, config);
            setData(resData);
        } catch (error) {
            setError(error.message || "Something went wrong");
        }
        setIsLoading(false);
    }, [url, config]);

    useEffect(() => {
        if ((config && (config.method === "GET" || !config.method)) || !config) {
            sendRequest();
        }
    }, [sendRequest]);

    return { data, isLoading, error, sendRequest };
};
