import { FallbackProps } from "react-error-boundary";
import { Button } from "../../ui/Button/Button";
import { useEffect, useState } from "react";
import { EmptyDataError } from "../../exceptions/EmptyDataError";

export function ErrorPage({ error }: FallbackProps) {
    const [bttnContent, setBttnContent] = useState<string>("")

    useEffect(() => {
        if (error instanceof EmptyDataError)
            setBttnContent("Back")
        if (error instanceof TypeError)
            setBttnContent("Reconnect")
    }, [])

    return (
        <>
            <section> 
                { error.message } 
                <Button bttnHandler={() => window.location.replace("/app/main")}> { bttnContent } </Button>
            </section>
        </>
    )
}