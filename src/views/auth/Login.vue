```vue
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "../../api";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const router = useRouter();

const login = async () => {
    errorMessage.value = "";

    if (!email.value || !password.value) {
        errorMessage.value = "Email dan password wajib diisi.";
        return;
    }

    loading.value = true;

    try {
        const response = await Api.post("/api/auth/login", {
            email: email.value,
            password: password.value,
        });

        // Ambil access token dari response Laravel
        const token = response.data.data.access_token;

        // Simpan token di browser
        localStorage.setItem("token", token);

        // Pindah ke halaman products
        router.push("/products");

    } catch (error: any) {
        if (error.response?.status === 401) {
            errorMessage.value = "Email atau password salah.";
        } else {
            errorMessage.value = "Terjadi kesalahan. Silakan coba lagi.";
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-5">

                <div class="card shadow-sm">
                    <div class="card-body p-4">

                        <h3 class="mb-4 text-center">Login</h3>

                        <!-- Error -->
                        <div
                            v-if="errorMessage"
                            class="alert alert-danger"
                        >
                            {{ errorMessage }}
                        </div>

                       <form @submit.prevent="login">

    <div class="mb-3">
        <label class="form-label">
            Email
        </label>

        <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Masukkan email"
        >
    </div>

    <div class="mb-3">
        <label class="form-label">
            Password
        </label>

        <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Masukkan password"
        >
    </div>

    <button
        type="submit"
        class="btn btn-primary w-100"
        :disabled="loading"
    >
        {{ loading ? "Logging in..." : "Login" }}
    </button>

</form>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
```
