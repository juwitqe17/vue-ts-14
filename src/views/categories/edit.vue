<script setup lang="ts">

//import ref dan onMounted dari vue
import { ref, onMounted } from "vue";

//import useRoute dan useRouter dari vue-router
import { useRoute, useRouter } from "vue-router";

//import Api dari folder api
import Api from "../../api";

// Interface Errors
interface Errors {
    name?: string[];
}

// State untuk form
const name = ref("");

// State errors
const errors = ref<Errors>({});

//initiate route and router
const route = useRoute();
const router = useRouter();

// Fetch product details
const fetchDetailKategori = async () => {
    try {

        //fetch data product berdasarkan id
        const response = await Api.get(`/api/kategoris/${route.params.id}`);

        //set data ke state
        name.value = response.data.data.name;

    } catch (error) {

        //log error
        console.error("Error fetching product:", error);
    }
};

//run hook "onMounted"
onMounted(() => {

    //call method "fetchDetailProduct"
    fetchDetailKategori();
});


// Handle form submission
const updateKategori = async () => {

    //initiate form data
    const formData = new FormData();

    //append data to form data
    formData.append("name", name.value);
    formData.append("_method", "PUT");

    try {

        //send data to api
        await Api.post(`/api/kategoris/${route.params.id}`, formData);

        //redirect to products page
        router.push("/kategoris");

    } catch (error: any) {

        //set error to state
        errors.value = error.response.data;
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="mb-3">Update data category</h1>
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <form @submit.prevent="updateKategori">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Name Category" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">
                                    {{ errors.name[0] }}
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
