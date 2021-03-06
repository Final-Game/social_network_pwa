import { useRouter } from "next/router";
import React from "react";
import { HOME_PAGE_ROUTE } from "src/Routes/contants";

const AuthenticatePageNotRequired = (props: any) => {
    const router = useRouter();

    let accountId: string | null = "";
    let authToken: string | null = "";
    let refreshToken: string | null = "";

    if (typeof window !== "undefined") {
        accountId = localStorage.getItem("account_id");
        authToken = localStorage.getItem("auth_token");
        refreshToken = localStorage.getItem("refresh_token");

        // TODO Validate account.

        if (accountId && authToken && refreshToken) {
            router.push(HOME_PAGE_ROUTE)
        }
    }


    return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthenticatePageNotRequired;
