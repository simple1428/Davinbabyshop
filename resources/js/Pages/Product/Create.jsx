import React from "react";
import { useForm, usePage, Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import {
    Box,
    Button,
    TextField,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    FormHelperText,
} from "@mui/material";

export default function Create() {
    const { props } = usePage();
    const { post, data, setData, processing, errors } = useForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"), {
            onSuccess: () => {
                // Redirect or notify user of success
            },
            onError: (errors) => {
                console.error("There was an error adding the product!", errors);
            },
        });
    };

    return (
        <>
            <Head title="Add Product" />
            <HomeLayout>
                <div className="p-4 ml-32">
                    <h1 className="text-lg uppercase text-primary font-bold mb-5">
                        Add Product
                    </h1>
                    <Box
                        sx={{
                            background: "white",
                            boxShadow: "2px 4px 20px #BCBCBC",
                            padding: 4,
                            borderRadius: 2,
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        error={!!errors.name}
                                        helperText={errors.name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        error={!!errors.description}
                                        helperText={errors.description}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Price"
                                        type="number"
                                        fullWidth
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        error={!!errors.price}
                                        helperText={errors.price}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Stock"
                                        type="number"
                                        fullWidth
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData("stock", e.target.value)
                                        }
                                        error={!!errors.stock}
                                        helperText={errors.stock}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="category_id">
                                            Category
                                        </InputLabel>
                                        <Select
                                            labelId="category_id"
                                            value={data.category_id}
                                            onChange={(e) =>
                                                setData(
                                                    "category_id",
                                                    e.target.value
                                                )
                                            }
                                            error={!!errors.category_id}
                                        >
                                            <MenuItem value="">
                                                <em>Select a category</em>
                                            </MenuItem>
                                            {props.categories.map(
                                                (category) => (
                                                    <MenuItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                        {errors.category_id && (
                                            <FormHelperText error>
                                                {errors.category_id}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Image URL"
                                        fullWidth
                                        value={data.image}
                                        onChange={(e) =>
                                            setData("image", e.target.value)
                                        }
                                        error={!!errors.image}
                                        helperText={errors.image}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={processing}
                                    >
                                        Add Product
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </div>
            </HomeLayout>
        </>
    );
}
