import MainContainer from "@/components/MainContainer/MainContainer";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Home = () => {
    const [isLoading, setIsLoading] = useState(false); // zmienic potem na true

    return (
        <MainContainer type="dashboard">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Outstanding Receivables
                            </CardTitle>
                            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$????</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Outstanding Payables
                            </CardTitle>
                            {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$????</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                ???????
                            </CardTitle>
                            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">??</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Number of invoices
                            </CardTitle>
                            {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">??</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p> */}
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card
                        className="xl:col-span-2"
                        x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Transactions</CardTitle>
                                <CardDescription>
                                    At vero eos et accusamus et iusto odio
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1">
                                123
                            </Button>
                        </CardHeader>
                        <CardContent></CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Last invoices</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/01.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>LI</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Lorem ipsum
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        lorem.ipsum@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +$??
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage
                                        src="/avatars/02.png"
                                        alt="Avatar"
                                    />
                                    <AvatarFallback>DS</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Dolor Sit
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        dolor.sit@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    +$??
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainContainer>
    );
};

export default Home;
