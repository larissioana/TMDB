import { Stack } from "@mui/material";
import Link from "next/link";
import { signOutUser } from '@/utils/firebase';
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/router";

const NavigationBar = () =>
{
    const router = useRouter();
    const {currentUser, setCurrentUser} = useContext(UserContext);

    const handleOnClickHome = () =>
    {
        router.push('/');
    };

    const handleSignOut = async () => 
    {
      await signOutUser();
      setCurrentUser(null);
      router.push('/auth/login'); 
    }

    return (
        <>
        <Stack
            direction = "row"
            alignItems = "center"
            px = { 4 }
            sx =
            {{
                position: "sticky",
                backgroundColor: "var(--black)",
                top: 0,
                justifyContent: "center",
                minHeight: "9vh",
                padding: "1rem"
            }}
        >
            <Link 
                href = "/"
                onClick = {handleOnClickHome}
                style =
                {{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                    color: "white"
                }}
            >
                Home
            </Link>
            {
            !currentUser ?
                <Link style =
                {{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                    marginLeft: "1rem",
                    color: "white"
                }} 
                    href='/auth/login'>
                        Sign in
                </Link>
                   :
                <Link style =
                {{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                    marginLeft: "1rem",
                    color: "white"
                }}
                    href='/auth/login'
                    onClick = {handleSignOut}>
                        Sign out
                </Link>
            }
        </Stack>
        </>
    )
};

export default NavigationBar;