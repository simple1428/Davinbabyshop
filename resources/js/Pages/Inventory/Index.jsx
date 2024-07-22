import React from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function Index() {
    const { inventories } = usePage().props;

    const rows = inventories.map((inventory) => ({
        id: inventory.id,
        product: inventory.product.name,
        quantity: inventory.quantity,
    }));

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "product", headerName: "Product", width: 250 },
        { field: "quantity", headerName: "Quantity", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <>
                    <Link href={route("inventory.edit", params.id)}>Edit</Link>
                    <Link
                        href={route("inventories.destroy", params.id)}
                        method="delete"
                    >
                        Delete
                    </Link>
                </>
            ),
        },
    ];

    return (
        <>
            <Head title="Manage Inventory" />
            <HomeLayout>
                <div className="p-4 ml-32">
                    <div className="flex justify-between items-center border-b mb-5 py-5 bg-white shadow-xl rounded-lg px-6">
                        <h1 className="text-lg uppercase text-primary font-bold">
                            Inventory
                        </h1>
                        <div>
                            <Link
                                href={route("inventory.create")}
                                className="rounded-lg px-4 py-2 bg-primary hover:bg-opacity-80 text-white text-sm"
                            >
                                + Inventory
                            </Link>
                        </div>
                    </div>

                    <Box
                        sx={{
                            height: 600,
                            width: "100%",
                            background: "white",
                            boxShadow: "2px 4px 20px #BCBCBC",
                        }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            </HomeLayout>
        </>
    );
}
