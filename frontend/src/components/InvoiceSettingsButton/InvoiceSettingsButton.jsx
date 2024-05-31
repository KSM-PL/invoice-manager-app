import React from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useToast } from "@/components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

function InvoiceSettingsButton({type = "invoice-out", id, setRefetchInvoice}) {
    const authHeader = useAuthHeader();
    const { toast } = useToast();

    const payInvoice = (invoiceId) => {
        fetch(`http://localhost:8080/api/v1/invoices/${invoiceId}/pay`, {
            method: 'PUT',
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
            setRefetchInvoice(true);

            toast({
                title: "Hurrah!",
                description: "Paid successfully!",
                className: "bg-green-800"
            })
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
    }

    const fetchInvoiceDetails = async (invoiceId) => {
        const response = await fetch(`http://localhost:8080/api/v1/invoices/${invoiceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": authHeader,
            },
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message);
        }

        return response.json();
    };

    const downloadInvoiceJSON = async (invoiceId) => {
        try {
            const invoiceData = await fetchInvoiceDetails(invoiceId);
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoiceData));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `invoice_${invoiceId}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error downloading invoice.",
                description: error.message,
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="gap-1 p-2 cursor-pointer hover:bg-secondary rounded-md">
                <DotsHorizontalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {type === "invoice-in" && 
                    <DropdownMenuItem 
                        className="cursor-pointer"
                        onClick={() => payInvoice(id)}
                    >
                        Pay
                    </DropdownMenuItem>
                }
                <DropdownMenuItem 
                    className="cursor-pointer" 
                    onClick={() => downloadInvoiceJSON(id)}
                >
                        Export JSON as...
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceSettingsButton;
