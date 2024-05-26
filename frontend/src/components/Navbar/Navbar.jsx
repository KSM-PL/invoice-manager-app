import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useLocation } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import ModeToggle from "@/components/ModeToggle";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();
    // const auth = useAuthUser();

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 w-full justify-between backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Icons.dolar className="h-8 w-8 fill-current" />
                    {/* <span className="Invoice manager app">Invoice manager app</span> */}
                </Link>
                { isAuthenticated ? (
                    <>
                        <Link
                            to="/"
                            className={cn("transition-colors hover:text-foreground", (location.pathname == "/") ? "text-foreground [text-shadow:_0_0_15px_rgb(255_255_255_/_100%)]" : "text-muted-foreground")}
                            // className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/invoice-in"
                            className={cn("transition-colors hover:text-foreground", (location.pathname == "/invoice-in") ? "text-foreground [text-shadow:_0_0_15px_rgb(255_255_255_/_100%)]" : "text-muted-foreground")}
                        >
                            Invoice in
                        </Link>
                        <Link
                            to="/invoice-out"
                            className={cn("transition-colors hover:text-foreground", (location.pathname == "/invoice-out") ? "text-foreground [text-shadow:_0_0_15px_rgb(255_255_255_/_100%)]" : "text-muted-foreground")}
                        >
                            Invoice out
                        </Link>
                    </>
                ) : null }
            </nav>

            { !isAuthenticated ? <Icons.dolar className="flex md:hidden h-8 w-8 fill-current" /> : null }
            
            { isAuthenticated ? (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Icons.menu className="h-6 w-6 fill-current" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                {/* <Icons.github className="h-6 w-6" /> */}
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Analytics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            ) : null }
            <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <ModeToggle className="mx-3"/>

                { isAuthenticated ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <Icons.user className="h-5 w-5 fill-current" />
                            {/* <CircleUser className="h-5 w-5" /> */}
                            {/* <span className="sr-only">Toggle user menu</span> */}
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator /> */}
                            <DropdownMenuItem className="cursor-pointer">Export data (JSON)</DropdownMenuItem>
                            {/* <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <Link to="/logout">
                                <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : null }

            </div>

        </header>
    );
}

export default Navbar;
