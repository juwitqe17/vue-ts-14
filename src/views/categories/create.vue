<script setup lang="ts">

//import ref dari vue
import { ref } from "vue";

//import useRouter dari vue-router
import { useRouter } from "vue-router";

//import Api dari folder api
import Api from "../../api";

// Interface Errors
interface Errors {
    name?: string[];
}

// State untuk form
const name = ref("");

// State untuk error
const errors = ref<Errors>({});

// Router instance
const router = useRouter();

// Handle submit form
const storeKategori = async () => {

    errors.value = {};

    if(!name.value) {
        errors.value.name = ["Name is required."];
    }

    if (Object.keys(errors.value).length > 0) {
        return;
    }

    //inisialisasi form data
    const formData = new FormData();

    //append data ke form data
    formData.append("name", name.value);

    try {

        //send data ke api
        await Api.post("/api/kategoris", formData);

        //redirect ke halaman products
        router.push("/categories");

    } catch (error: any) {

        //set error ke state
        errors.value = error.response.data;
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <h1 class="mb-3">Create data category</h1>
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeKategori">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Name</label>
                                <input type="text" v-model="name" class="form-control" placeholder="name Product" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">{{ errors.name[0] }}</div>
                            </div>
                            <button type="submit" class="btn btn-md btn-primary rounded-5 shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
