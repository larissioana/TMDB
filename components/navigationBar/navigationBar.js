import { Stack } from "@mui/material";
import Link from "next/link";
import { signOutUser } from '@/utils/firebase';
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/router";
import { useMovieContext } from "@/context/moviesContext";

const NavigationBar = () => {
    const router = useRouter();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { setActiveContentType } = useMovieContext();

    const handleTvShows = (type) => {
        setActiveContentType(type);
    };

    const handleOnClickHome = (path) => {
        router.push(path);
    };

    const handleSignOut = async () => {
        await signOutUser();
        setCurrentUser(null);
        router.push('/auth/login');
    }

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                px={4}
                sx=
                {{
                    position: "fixed",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    top: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "5rem",
                    padding: "1rem",
                    left: 0,
                    width: "100%",
                    zIndex: 10,
                    backdropFilter: "blur(10px)"
                }}
            >
                <Link
                    href="/"
                    onClick={() => {
                        handleTvShows("movie");
                        handleOnClickHome("/")
                    }}
                    style=
                    {{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                        color: "white"
                    }}
                >
                    Movies
                </Link>
                <Link
                    href="/tvShows"
                    onClick={() => {
                        handleTvShows("tv");
                        handleOnClickHome('/tvShows')
                    }}
                    style=
                    {{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                        color: "white",
                        marginLeft: "1rem"
                    }}
                >
                    TV Shows
                </Link>
                <Link
                    href="/people/popularPeople"
                    style=
                    {{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                        color: "white",
                        marginLeft: "1rem"
                    }}
                >
                    Popular People
                </Link>
                {
                    !currentUser ?
                        <Link style=
                            {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                                marginLeft: "1rem",
                                color: "white"
                            }}
                            href='/auth/login'>
                            Sign in
                        </Link>
                        :
                        <Link style=
                            {{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "clamp(.9rem, 2vw, 1.2rem)",
                                marginLeft: "1rem",
                                color: "white"
                            }}
                            href='/auth/login'
                            onClick={handleSignOut}>
                            Sign out
                        </Link>
                }
            </Stack>
        </>
    )
};

export default NavigationBar;