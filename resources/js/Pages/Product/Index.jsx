import React, { useState } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoIosAdd } from "react-icons/io";
export default function Index() {
    const { categories, products } = usePage().props;
    const [rows, setRows] = useState(
        products.map((product, index) => ({
            id: index + 1,
            ...product,
        }))
    );

    const handleDeleteClick = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "name",
            headerName: "Name",
            width: 250,
            editable: true,
        },
        {
            field: "price",
            headerName: "Price",
            width: 160,
            editable: true,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            width: 110,
            editable: true,
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(params.id)}
                />,
            ],
        },
    ];

    return (
        <>
            <Head title="Kelola Produk" />
            <HomeLayout>
                <div className="p-4 ml-32  ">
                    <div className="flex justify-between items-center border-b mb-5 py-5 bg-white shadow-xl rounded-lg px-6">
                        <h1 className="text-lg uppercase text-primary font-bold">
                            Product
                        </h1>
                        <div>
                            <Link
                                href="#"
                                className="rounded-lg px-4 py-2 bg-primary hover:bg-opacity-80 text-white text-sm"
                            >
                                + Product
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
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
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
