import "../layout.css"
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary"
import { PageHeader } from "../components/PageHeader/PageHeader.tsx";
import { NavMenu } from "../components/NavMenu/NavMenu.tsx"
import { useState } from "react";
import { ErrorPage } from "./Error/ErrorPage.tsx";

export function PageTemplate() {
    const [header, setHeader] = useState(PageHeader({ pageName: "SmartWallet" }))

    return (
        <>
            <div className="page">
                {header}
                <main className="page__content">
                    <ErrorBoundary FallbackComponent={ErrorPage}>
                        <Outlet context={setHeader} />
                    </ErrorBoundary>
                </main>
                <NavMenu />
            </div>
        </>
    )
}