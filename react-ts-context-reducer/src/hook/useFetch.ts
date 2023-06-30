
//  MAY BUG
import { useState, useEffect } from "react";

interface Response <T = any> {
    data: T | null
    error?: boolean
    isLoading: boolean
}

export const useFetch = <T>(url: string): Response<T> => {
    const [data, setData] = useState<T | null>(null)
    const [error, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => { 
        const controller = new AbortController()
        const signal = controller.signal

        async function handleRequest(){
            try{
                setIsLoading(true)
                const response = await fetch(url, {signal: signal})
                const jsonData = await response.json()
                setData(jsonData)
            } catch(e) {
                if (e === 'AbortError') {
                    console.log('successfully aborted');
                } else {
                    setIsError(true)
                    console.log(error)
                }
            } finally {
                setIsLoading(false)
            } 
        }
        handleRequest()
        // clean up function
        // cancel the request before component unmounts
        return () => {
            controller.abort
        }
    }, [])

    return {
        data,
        error,
        isLoading
    }
}

