import { refreshPromise } from "../App.tsx";
import { EmptyDataError } from "../exceptions/EmptyDataError.ts";
import { RequestOptions } from "../types/RequestOptions.ts";


export async function apiClient(request:string, options: RequestOptions) : Promise<Response> {
    let response = await fetch("http://localhost:5004/" + request, { credentials: "include", ...options });

    if(response.status === 200)
        return response

    if (response.status !== 401)
        throw new EmptyDataError(await response.json())

    if(!refreshPromise.promise)
        refreshPromise.promise = fetch("http://localhost:5004/Auth", { method: "GET", credentials: "include" }).finally( () => { refreshPromise.promise = null } )

    response = await refreshPromise.promise

    //Auth error
    if (response.status == 401) {
        window.location.replace("/login");
        return
    }

    apiClient(request, options)
}