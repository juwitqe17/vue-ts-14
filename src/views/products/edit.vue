<script setup lang="ts">

//import ref dan onMounted dari vue
import { ref, onMounted } from "vue";

//import useRoute dan useRouter dari vue-router
import { useRoute, useRouter } from "vue-router";

//import Api dari folder api
import Api from "../../api";

// Interface Category
interface Category {
    id: number;
    name: string;
}

// Interface Errors
interface Errors {
    id_kategori?: string[];
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
}

// State untuk categories list
const categories = ref<Category[]>([]);

// State untuk form
const id_kategori = ref("");
const name = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");

// State errors
const errors = ref<Errors>({});

//initiate route and router
const route = useRoute();
const router = useRouter();

// Fetch data categories dari API
const fetchCategories = async () => {
    try {
        const response = await Api.get("/api/kategoris");
        categories.value = response.data.data || response.data;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
};

// Fetch product details
const fetchDetailProduct = async () => {
    try {
        const response = await Api.get(`/api/products/${route.params.id}`);

        // Buat penanganan fallback struktur response API
        const product = response.data.data || response.data;

        // Set data ke state form
        id_kategori.value = product.id_kategori;
        name.value = product.name;
        description.value = product.description;
        price.value = product.price;
        stock.value = product.stock;

    } catch (error) {
        console.error("Error fetching product detail:", error);
    }
};

// Gabung fetch categories & detail product dalam satu lifecycle hook
onMounted(() => {
    fetchCategories();
    fetchDetailProduct();
});

// Handle form submission
const updateProduct = async () => {
    const formData = new FormData();

    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("id_kategori", id_kategori.value);
    formData.append("_method", "PUT");

    try {
        await Api.post(`/api/products/${route.params.id}`, formData);
        router.push("/products");
    } catch (error: any) {
        if (error.response && error.response.data) {
            errors.value = error.response.data;
        }
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="mb-3">Update Data Product</h1>
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <form @submit.prevent="updateProduct">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Name Product" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    {{ errors.name[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Category</label>
                                <select v-model="id_kategori" class="form-control">
                                    <option value="">-- Select Category --</option>
                                    <option 
                                        v-for="category in categories" 
                                        :key="category.id" 
                                        :value="category.id"
                                    >
                                        {{ category.name }}
                                    </option>
                                </select>
                                <div v-if="errors.id_kategori" class="alert alert-danger mt-2">
                                    {{ errors.id_kategori[0] }}
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Description</label>
                                <textarea v-model="description" class="form-control" rows="5" placeholder="Description Product"></textarea>
                                <div v-if="errors.description" class="alert alert-danger mt-2">
                                    {{ errors.description[0] }}
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Price</label>
                                        <input type="number" v-model="price" class="form-control" placeholder="Price Product" />
                                        <div v-if="errors.price" class="alert alert-danger mt-2">
                                            {{ errors.price[0] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Stock</label>
                                        <input type="number" v-model="stock" class="form-control" placeholder="Stock Product" />
                                        <div v-if="errors.stock" class="alert alert-danger mt-2">
                                            {{ errors.stock[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-5 shadow border-0">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>