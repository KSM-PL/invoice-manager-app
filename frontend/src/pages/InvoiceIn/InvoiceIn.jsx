import React, { useState, useEffect } from 'react';
import MainContainer from "@/components/MainContainer/MainContainer";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
    CheckIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const InvoiceIn = () => {
	const authHeader = useAuthHeader();
    const { toast } = useToast();

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);


    const fetchInvoices = async () => {
        setLoading(true);

        fetch(`http://localhost:8080/api/v1/invoices/?pageNumber=${(currentPage - 1)}&pageSize=${pageSize}&type=in`, {
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
            console.log(data);
            
            setInvoices(data.content);
            setTotalPages(data.totalPages);
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
    };

    useEffect(() => {
        fetchInvoices();
        // console.log(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <MainContainer type="invoice-in">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-fit text-nowrap">Invoice ID</TableHead>
                            <TableHead className="w-fit text-nowrap">Author name</TableHead>
                            <TableHead className="w-fit text-nowrap">Author email</TableHead>
                            <TableHead className="w-full text-nowrap">Description</TableHead>
                            <TableHead className="w-fit text-right text-nowrap">Amount</TableHead>
                            <TableHead className="w-fit text-right text-nowrap"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {loading ? (
                            <>
                            <TableRow>
                                <TableCell><Skeleton className="w-[180px] h-[30px] my-1" /></TableCell>
                                <TableCell><Skeleton className="w-[50px] h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-[90px] h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-full h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-[40px] h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-[40px] h-[30px]" /></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton className="w-[180px] h-[30px] my-1" /></TableCell>
                                <TableCell><Skeleton className="w-[50px] h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-[50px] h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-full h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-[40px] h-[30px]" /></TableCell>
                                <TableCell><Skeleton className="w-[40px] h-[30px]" /></TableCell>
                            </TableRow>
                            </>

                        ) : (
                            invoices && invoices.map((invoice, i) => {
                                return (
                                    <TableRow key={`tablerow-${invoice.id}`}>
                                        <TableCell className="font-medium">{invoice.id}</TableCell>
                                        <TableCell>{invoice.authorFullName}</TableCell>
                                        <TableCell>{invoice.authorEmail}</TableCell>
                                        <TableCell>{invoice.name}</TableCell>
                                        <TableCell>${invoice.amount}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" className="gap-1 p-2">
                                                <CheckIcon />
                                                Pay
                                            </Button>
                                        </TableCell>
                                        
                                    </TableRow>
                                )
                            })
                        )}
                        

                            {/* <TableCell className="font-medium">???</TableCell>
                            <TableCell>??</TableCell>
                            <TableCell>??</TableCell>
                            <TableCell>???</TableCell>
                            <TableCell>$??</TableCell> */}
                        
                    </TableBody>
                </Table>

                {totalPages > 1 && (
                    <div className="flex flex-row justify-center items-center gap-3">
                        <Button onClick={handlePrevPage} className="cursor-pointer flex flex-row justify-center items-center gap-[2px]" disabled={currentPage === 1}>
                            <ChevronLeftIcon />
                            Previous
                        </Button>
                        
                        <p>{currentPage}</p>

                        <Button onClick={handleNextPage} className="cursor-pointer flex flex-row justify-center items-center gap-[2px]" disabled={currentPage === (totalPages)}>
                            Next
                            <ChevronRightIcon />
                        </Button>
                    </div>
                )}

                {!loading && invoices.length === 0 ? (
                    <h1 className="pb-2 text-md font-semibold tracking-tight opacity-50 transition-colors text-center">No invoices to display</h1>
                ) : null}

            </div>
        </MainContainer>
    )
}

export default InvoiceIn;
