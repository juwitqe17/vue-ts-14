<script setup lang="ts">

//import ref dan onMounted dari Vue
import { ref, onMounted } from "vue";

//import service api
import Api from "../../api";

// Interface Product
interface Kategori {
    id: number;
    name: string;
}

// State products
const Kategoris = ref<Kategori[]>([]);

// Fetch data products dari API
const fetchDataKategoris = async () => {
    try {

        //fetch data products dari API
        const response = await Api.get("/api/kategoris");

        //set data products
        Kategoris.value = response.data.data || response.data;

    } catch (error) {

        //log error
        console.error("Error fetching categories:", error);
    }
};

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDataPosts"
    fetchDataKategoris();
});

// Handle delete product
const deleteKategori = async (id: number) => {
  try {

    //delete product berdasarkan id
    await Api.delete(`/api/kategoris/${id}`);

    //call method "fetchDataPosts"
    fetchDataKategoris();

  } catch (error) {

    //log error
    console.error("Error deleting kategori:", error);
  }
};
</script>

<template>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <router-link to="/categories/create" class="btn btn-md btn-success rounded-5 shadow border-0 mb-3">
                    ADD NEW CATEGORY
                </router-link>
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Category Name</th>
                                    <th scope="col" style="width: 15%">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="Kategoris.length === 0">
                                    <td colspan="6" class="text-center">
                                        <div class="alert alert-danger mb-0">No data available</div>
                                    </td>
                                </tr>
                                <tr v-for="kategori in Kategoris" :key="kategori.id">
                                    <td>{{ kategori.name }}</td>
                                    <td class="text-center">
                                        <router-link :to="`/categories/edit/${kategori.id}`"
                                            class="btn btn-sm btn-primary rounded-5 shadow border-0 me-2">
                                            EDIT
                                        </router-link>
                                        <button @click="deleteKategori(kategori.id)" class="btn btn-sm btn-danger rounded-5 shadow border-0">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
