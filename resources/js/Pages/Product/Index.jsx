import React, { useState, useEffect } from "react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField, // Import TextField for search input
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon
import { IoIosAdd } from "react-icons/io";

export default function Index() {
    const { categories, products } = usePage().props;
    const [rows, setRows] = useState(
        products.map((product) => ({
            id: product.id,
            ...product,
        }))
    );

    const [search, setSearch] = useState(""); // State for search input
    const [filteredRows, setFilteredRows] = useState(rows);

    useEffect(() => {
        setFilteredRows(
            rows.filter((row) =>
                row.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, rows]);

    const { delete: destroy } = useForm();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const handleClickOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    const handleDeleteClick = () => {
        destroy(route("products.destroy", selectedId), {
            onSuccess: () => {
                setRows(rows.filter((row) => row.id !== selectedId));
                handleClose();
            },
            onError: (errors) => {
                console.error(
                    "There was an error deleting the product!",
                    errors
                );
            },
        });
    };

    const handleEditClick = (id) => {
        window.location.href = route("products.edit", id); // Navigate to edit page
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
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />} // Add Edit icon
                    label="Edit"
                    onClick={() => handleEditClick(params.id)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleClickOpen(params.id)}
                />,
            ],
        },
    ];

    return (
        <>
            <Head title="Kelola Produk" />
            <HomeLayout>
                <div className="p-4 ml-32">
                    <div className="flex justify-between items-center border-b mb-5 py-5 bg-white shadow-xl rounded-lg px-6">
                        <h1 className="text-lg uppercase text-primary font-bold">
                            Product
                        </h1>
                        <div>
                            <Link
                                href={route("products.create")}
                                className="rounded-lg px-4 py-2 bg-primary hover:bg-opacity-80 text-white text-sm"
                            >
                                + Product
                            </Link>
                        </div>
                    </div>

                    {/* Search Input */}
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Box
                        sx={{
                            height: 600,
                            width: "100%",
                            background: "white",
                            boxShadow: "2px 4px 20px #BCBCBC",
                        }}
                    >
                        <DataGrid
                            rows={filteredRows}
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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleDeleteClick}
                        color="primary"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
