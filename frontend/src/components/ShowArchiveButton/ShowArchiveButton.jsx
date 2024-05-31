import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
    CheckIcon,
    ArrowDownIcon,
} from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";
import InvoiceSettingsButton from "@/components/InvoiceSettingsButton/InvoiceSettingsButton";
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";
import { cn } from './../../lib/utils';

const ShowArchiveButton = ({type = "in"}) => {
	const authHeader = useAuthHeader();
    const { toast } = useToast();

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    const [refetchInvoice, setRefetchInvoice] = useState(false);

    const fetchInvoices = async () => {
        setLoading(true);

        fetch(`http://localhost:8080/api/v1/invoices/history?pageNumber=${(currentPage - 1)}&pageSize=${pageSize}&type=${type}&sortField=dueDate&isPaid=true&sortDirection=asc`, {
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
        setRefetchInvoice(false);
        fetchInvoices();
        // console.log(currentPage);
    }, [currentPage, refetchInvoice]);

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
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant="secondary" 
                    className="mt-5 gap-1 flex flex-row flex-nowrap"
                >
                    <Icons.history className="w-5 h-6 fill-current" />
                    Show archive
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full w-[1000px] flex flex-col justify-center items-start">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-center sm:text-start">Invoice archive</DialogTitle>
                    <DialogDescription>
                        You can check already paid invoices.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 p-4 max-w-full">
                    <Table className="overflow-x-auto">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-fit text-nowrap">Invoice ID</TableHead>
                                <TableHead className="w-fit text-nowrap">Author name</TableHead>
                                <TableHead className="w-fit text-nowrap">Author email</TableHead>
                                <TableHead className="w-full text-nowrap">Description</TableHead>
                                <TableHead className="w-fit text-right text-nowrap flex flex-row justify-center items-center gap-1"><ArrowDownIcon />Due date</TableHead>
                                <TableHead className="w-fit text-right text-nowrap">Amount</TableHead>
                                <TableHead className="w-fit text-right text-nowrap"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {loading ? (
                                <>
                                    <TableRow>
                                        <TableCell><Skeleton className="w-[170px] h-[30px] my-1" /></TableCell>
                                        <TableCell><Skeleton className="w-[90px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[80px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-full h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[60px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[40px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[30px] h-[30px]" /></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Skeleton className="w-[170px] h-[30px] my-1" /></TableCell>
                                        <TableCell><Skeleton className="w-[90px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[80px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-full h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[60px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[40px] h-[30px]" /></TableCell>
                                        <TableCell><Skeleton className="w-[30px] h-[30px]" /></TableCell>
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
                                            <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                                            <TableCell>${invoice.amount}</TableCell>
                                            <TableCell>
                                                <InvoiceSettingsButton 
                                                    id={invoice.id} 
                                                    type="history" 
                                                    setRefetchInvoice={setRefetchInvoice} 
                                                />                                        
                                            </TableCell>
                                            
                                        </TableRow>
                                    )
                                })
                            )}
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


                    {invoices && (invoices.length === 0) && !loading && 
                        <div className="h-full flex flex-col justify-center items-center ">
                            <Icons.noData className="h-[100px] w-full opacity-20"/>
                            <h1 className="pb-2 mt-3 text-md font-semibold tracking-tight opacity-50 transition-colors text-center">No invoices to display</h1>
                        </div>
                    }

                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ShowArchiveButton;
