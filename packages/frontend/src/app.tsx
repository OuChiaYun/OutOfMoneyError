import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, FlowProps, Suspense } from "solid-js";
import "./app.css";
import Nav from "~/components/Nav";
import { DarkModeProvider } from "~/providers/DarkModeProvider";
import Footer from "./components/Footer";
import { useDarkMode } from "./hooks/useDarkMode";
import { WagmiProvider } from "~/providers/WagmiProvider";
import { config } from "~/wagmiConfig";

function Background(props: FlowProps) {
    const [darkMode] = useDarkMode();

    return (
        <div
            class="flex min-h-screen flex-col bg-white text-black
            dark:bg-neutral-950 dark:text-white"
            classList={{ dark: darkMode() }}
        >
            {props.children}
        </div>
    );
}

export default function App() {
    return (
        <Router
            root={props => (
                <DarkModeProvider defaultDarkMode={true}>
                    <WagmiProvider config={config}>
                        <Background>
                            <Nav />
                            <div class="grow">
                                <ErrorBoundary fallback={err => err}>
                                    <Suspense>{props.children}</Suspense>
                                </ErrorBoundary>
                            </div>
                            <Footer />
                        </Background>
                    </WagmiProvider>
                </DarkModeProvider>
            )}
        >
            <FileRoutes />
        </Router>
    );
}
