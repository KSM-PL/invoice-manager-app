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
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import InvoiceIn from './../InvoiceIn/InvoiceIn';
import {
    PlusCircledIcon
} from "@radix-ui/react-icons";

const Home = () => {
    const authHeader = useAuthHeader();
    const { toast } = useToast();

    const [loading, setLoading] = useState(false);
    const [invoicesIn, setInvoicesIn] = useState([]);
    const [invoicesOut, setInvoicesOut] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:8080/api/v1/invoices/?pageNumber=0&pageSize=3&type=in`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": authHeader,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(JSON.stringify(err));
                });
            }
            return response.json();
        })
        .then(data => {
            setInvoicesIn(data.content);
        })
        .catch(error => {
            console.log(error);
            const errorMessage = JSON.parse(error.message);

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage.message,
            })
        });



        fetch(`http://localhost:8080/api/v1/invoices/?pageNumber=0&pageSize=3&type=out`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": authHeader,
            },
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(JSON.stringify(err));
                });
            }
            return response.json();
        })
        .then(data => {
            setInvoicesOut(data.content);
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
            const errorMessage = JSON.parse(error.message);

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage.message,
            })
        });
       
    }, []);


    return (
        <MainContainer type="dashboard">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                ???????
                            </CardTitle>
                            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">??</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                ???????
                            </CardTitle>
                            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">??</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-2" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                ???????
                            </CardTitle>
                            {/* <CreditCard className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">??</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p> */}
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-01-chunk-3" className="col-span-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Number of invoices
                            </CardTitle>
                            {/* <Activity className="h-4 w-4 text-muted-foreground" /> */}
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">??</div>
                            {/* <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p> */}
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Recently Received Invoices</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            {loading ? (
                                <>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="grid gap-1">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                    <Skeleton className="ml-auto h-5 w-[50px]" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="grid gap-1">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                    <Skeleton className="ml-auto h-5 w-[50px]" />
                                </div>
                                    <div className="flex items-center gap-4">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="grid gap-1">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                    <Skeleton className="ml-auto h-5 w-[50px]" />
                                </div>
                            </>
                            ) : (
                                invoicesIn && invoicesIn.map((invoice, i) => {
                                    return (
                                        <div className="flex items-center gap-4" key={`last-invoice-${invoice.id}`}>
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                                <AvatarImage
                                                    src="/avatars/01.png"
                                                    alt="Avatar"
                                                />
                                                <AvatarFallback>LI</AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {invoice.authorFullName}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice.authorEmail}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">
                                                ${invoice.amount}
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                            {/* {(!loading && (invoicesIn.length === 0)) ? 
                                <div className="h-full flex flex-col justify-center items-center ">
                                    <Icons.noData className="h-[150px] w-full opacity-20"/>
                                    <h1 className="pb-2 mt-3 text-md font-semibold tracking-tight opacity-50 transition-colors text-center">No invoices to display</h1>
                                </div>
                            : (
                                null 
                            )} */}

                            {invoicesIn && (invoicesIn.length === 0) && !loading && 
                                <div className="h-full flex flex-col justify-center items-center ">
                                    <Icons.noData className="h-[150px] w-full opacity-20"/>
                                    <h1 className="pb-2 mt-3 text-md font-semibold tracking-tight opacity-50 transition-colors text-center">No invoices to display</h1>
                                </div>
                            }


                            {invoicesIn && (invoicesIn.length > 0) && !loading && 
                                <Link to="/invoice-in"><Button variant="outline" className="w-full">See all</Button></Link>
                            }

                        </CardContent>
                    </Card>

                    <Card x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Recently Sent Invoices</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            {loading ? (
                                <>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="grid gap-1">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                    <Skeleton className="ml-auto h-5 w-[50px]" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="grid gap-1">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                    <Skeleton className="ml-auto h-5 w-[50px]" />
                                </div>
                                    <div className="flex items-center gap-4">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                    <div className="grid gap-1">
                                        <Skeleton className="h-4 w-[100px]" />
                                        <Skeleton className="h-4 w-[180px]" />
                                    </div>
                                    <Skeleton className="ml-auto h-5 w-[50px]" />
                                </div>
                            </>
                            ) : (
                                invoicesOut && invoicesOut.map((invoice, i) => {
                                    return (
                                        <div className="flex items-center gap-4" key={`last-invoice-${invoice.id}`}>
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                                <AvatarImage
                                                    src="/avatars/01.png"
                                                    alt="Avatar"
                                                />
                                                <AvatarFallback>LI</AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {invoice.authorFullName}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {invoice.authorEmail}
                                                </p>
                                            </div>
                                            <div className="ml-auto font-medium">
                                                ${invoice.amount}
                                            </div>
                                        </div>
                                    )
                                })
                            )}

                            {invoicesOut && (invoicesOut.length === 0) && !loading && 
                                <div className="h-full flex flex-col justify-center items-center ">
                                    <Icons.noData className="h-[150px] w-full opacity-20"/>
                                    <h1 className="pb-2 mt-3 text-md font-semibold tracking-tight opacity-50 transition-colors text-center">No invoices to display</h1>
                                </div>
                            }


                            {invoicesOut && (invoicesOut.length > 0) && !loading && 
                                <Link to="/invoice-in"><Button variant="outline" className="w-full">See all</Button></Link>
                            }

                            {/* {!loading && invoicesOut.length > 0 ? 
                                <Link to="/invoice-in"><Button variant="outline" className="w-full">See all</Button></Link> 
                            : (
                                <div className="h-full flex flex-col justify-center items-center ">
                                    <Icons.noData className="h-[150px] w-full opacity-20"/>
                                    <h1 className="pb-2 mt-3 text-md font-semibold tracking-tight opacity-50 transition-colors text-center">No invoices to display</h1>
                                </div>
                            )} */}
                            

                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainContainer>
    );
};

export default Home;
