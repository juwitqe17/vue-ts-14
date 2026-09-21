```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Api from "../../api";

// Interface Product
interface Product {
    id?: number;
    id_kategori: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}

// State products
const products = ref<Product[]>([]);
const loading = ref(false);
const errorMessage = ref("");

// Fetch data products dari API
const fetchDataProducts = async () => {
    loading.value = true;
    errorMessage.value = "";

    try {
        const response = await Api.get("/api/products");

        products.value = response.data.data || response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        errorMessage.value = "Gagal mengambil data products.";
    } finally {
        loading.value = false;
    }
};

// Delete product
const deleteProduct = async (id?: number) => {
    if (!id) return;

    const confirmed = confirm("Yakin ingin menghapus product ini?");

    if (!confirmed) return;

    try {
        await Api.delete(`/api/products/${id}`);

        fetchDataProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Gagal menghapus product.");
    }
};

// Run hook onMounted
onMounted(() => {
    fetchDataProducts();
});
</script>

<template>
    <div class="container py-5">

        <!-- Header -->
        <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
        >
            <div>
                <h2 class="fw-bold mb-1">Products</h2>
                <p class="text-secondary mb-0">
                    Manage your product data.
                </p>
            </div>

            <router-link
                to="/products/create"
                class="btn btn-success px-4"
            >
                + Add Product
            </router-link>
        </div>

        <!-- Error -->
        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>

        <!-- Product Table -->
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">

            <div class="card-header bg-white py-3">
                <h6 class="mb-0 fw-semibold">
                    Product List
                </h6>
            </div>

            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">

                    <thead class="table-light">
                        <tr>
                            <th style="width: 5%">#</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th class="text-center" style="width: 16%">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        <!-- Loading -->
                        <tr v-if="loading">
                            <td colspan="7" class="text-center py-5">
                                <div
                                    class="spinner-border spinner-border-sm text-success me-2"
                                ></div>

                                Loading products...
                            </td>
                        </tr>

                        <!-- Empty -->
                        <tr v-else-if="products.length === 0">
                            <td colspan="7" class="text-center py-5">
                                <div class="text-secondary">
                                    <div class="fs-4 mb-2">
                                        📦
                                    </div>

                                    <div class="fw-semibold">
                                        No products found
                                    </div>

                                    <small>
                                        Belum ada data product.
                                    </small>
                                </div>
                            </td>
                        </tr>

                        <!-- Products -->
                        <tr
                            v-else
                            v-for="(product, index) in products"
                            :key="product.id"
                        >
                            <td class="text-secondary">
                                {{ index + 1 }}
                            </td>

                            <td>
                                <span class="fw-semibold">
                                    {{ product.name }}
                                </span>
                            </td>

                            <td>
                                <span class="text-secondary">
                                    {{ product.description || "-" }}
                                </span>
                            </td>

                            <td class="fw-semibold">
                                Rp {{ product.price.toLocaleString("id-ID") }}
                            </td>

                            <td>
                                <span
                                    class="badge"
                                    :class="
                                        product.stock > 0
                                            ? 'bg-success-subtle text-success'
                                            : 'bg-danger-subtle text-danger'
                                    "
                                >
                                    {{ product.stock }}
                                </span>
                            </td>

                            <td class="text-center">
                                <router-link
                                    v-if="product.id"
                                    :to="`/products/edit/${product.id}`"
                                    class="btn btn-sm btn-outline-primary me-1"
                                >
                                    Edit
                                </router-link>

                                <button
                                    v-if="product.id"
                                    @click="deleteProduct(product.id)"
                                    class="btn btn-sm btn-outline-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>
```
