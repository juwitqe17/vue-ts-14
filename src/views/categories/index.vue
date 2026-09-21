```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Api from "../../api";

// Interface Category
interface Kategori {
    id: number;
    name: string;
}

// State categories
const categories = ref<Kategori[]>([]);
const loading = ref(false);
const errorMessage = ref("");

// Fetch data categories dari API
const fetchDataCategories = async () => {
    loading.value = true;
    errorMessage.value = "";

    try {
        const response = await Api.get("/api/kategoris");

        categories.value = response.data.data || response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        errorMessage.value = "Gagal mengambil data categories.";
    } finally {
        loading.value = false;
    }
};

// Delete category
const deleteKategori = async (id: number) => {
    const confirmed = confirm("Yakin ingin menghapus category ini?");

    if (!confirmed) return;

    try {
        await Api.delete(`/api/kategoris/${id}`);

        fetchDataCategories();
    } catch (error) {
        console.error("Error deleting kategori:", error);
        alert("Gagal menghapus category.");
    }
};

// Run hook onMounted
onMounted(() => {
    fetchDataCategories();
});
</script>

<template>
    <div class="container py-5">

        <!-- Header -->
        <div
            class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4"
        >
            <div>
                <h2 class="fw-bold mb-1">Categories</h2>

                <p class="text-secondary mb-0">
                    Manage your product categories.
                </p>
            </div>

            <router-link
                to="/categories/create"
                class="btn btn-success px-4"
            >
                + Add Category
            </router-link>
        </div>

        <!-- Error -->
        <div
            v-if="errorMessage"
            class="alert alert-danger"
        >
            {{ errorMessage }}
        </div>

        <!-- Category Table -->
        <div class="card border-0 shadow-sm rounded-3 overflow-hidden">

            <div class="card-header bg-white py-3">
                <h6 class="mb-0 fw-semibold">
                    Category List
                </h6>
            </div>

            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">

                    <thead class="table-light">
                        <tr>
                            <th style="width: 8%">#</th>
                            <th>Category Name</th>
                            <th
                                class="text-center"
                                style="width: 20%"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        <!-- Loading -->
                        <tr v-if="loading">
                            <td
                                colspan="3"
                                class="text-center py-5"
                            >
                                <div
                                    class="spinner-border spinner-border-sm text-success me-2"
                                ></div>

                                Loading categories...
                            </td>
                        </tr>

                        <!-- Empty -->
                        <tr
                            v-else-if="categories.length === 0"
                        >
                            <td
                                colspan="3"
                                class="text-center py-5"
                            >
                                <div class="text-secondary">

                                    <div class="fs-4 mb-2">
                                        🗂️
                                    </div>

                                    <div class="fw-semibold">
                                        No categories found
                                    </div>

                                    <small>
                                        Belum ada data category.
                                    </small>

                                </div>
                            </td>
                        </tr>

                        <!-- Categories -->
                        <tr
                            v-else
                            v-for="(kategori, index) in categories"
                            :key="kategori.id"
                        >
                            <td class="text-secondary">
                                {{ index + 1 }}
                            </td>

                            <td>
                                <span class="fw-semibold">
                                    {{ kategori.name }}
                                </span>
                            </td>

                            <td class="text-center">

                                <router-link
                                    :to="`/categories/edit/${kategori.id}`"
                                    class="btn btn-sm btn-outline-primary me-1"
                                >
                                    Edit
                                </router-link>

                                <button
                                    @click="deleteKategori(kategori.id)"
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
