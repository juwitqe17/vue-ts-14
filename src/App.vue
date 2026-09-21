<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import Api from "./api";

const route = useRoute();
const router = useRouter();

const logout = async () => {
    try {
        await Api.post("/api/auth/logout");
    } catch (error) {
        console.error("Logout API failed:", error);
    } finally {
        // Hapus token meskipun request logout gagal
        localStorage.removeItem("token");

        // Kembali ke halaman login
        router.push("/login");
    }
};
</script>

<template>
  <div class="min-vh-100 bg-light">

    <!-- Navbar -->
    <nav v-if="route.name !== 'login'"
    class="navbar navbar-expand-lg bg-dark"
    data-bs-theme="dark""
    >
      <div class="container">

        <!-- Brand -->
        <router-link
          :to="{ name: 'home' }"
          class="navbar-brand fw-bold d-flex align-items-center gap-2"
        >
          Laravel Vue 
        </router-link>

        <!-- Mobile Toggle -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation -->
        <div
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">

            <!-- Home -->
            <li class="nav-item">
              <router-link
                :to="{ name: 'home' }"
                class="nav-link"
                :class="{ active: route.name === 'home' }"
              >
                Home
              </router-link>
            </li>

            <!-- Products -->
            <li class="nav-item">
              <router-link
                to="/products"
                class="nav-link"
                :class="{ active: route.path.startsWith('/products') }"
              >
                Products
              </router-link>
            </li>

            <!-- Categories -->
            <li class="nav-item">
              <router-link
                to="/categories"
                class="nav-link"
                :class="{ active: route.path.startsWith('/categories') }"
              >
                Categories
              </router-link>
            </li>

            <!-- <li class="nav-item ms-2">
                <button
                    @click="logout"
                    class="btn btn-outline-danger btn-sm"
                >
                    Logout
                </button>
            </li> -->

          </ul>

          <!-- Right Side -->
          <div class="d-flex align-items-center gap-3">
              <span class="text-secondary d-none d-lg-inline">
                  REST API
              </span>

              <a
                  href="https://santrikoding.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-success btn-sm px-3"
              >
                  SantriKoding
              </a>

              <button
                  @click="logout"
                  type="button"
                  class="btn btn-outline-danger btn-sm px-3"
              >
                  Logout
              </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main>
      <router-view />
    </main>

  </div>
</template>

<style scoped>
.brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #198754;
  border-radius: 8px;
  font-size: 16px;
}

.navbar-brand {
  letter-spacing: 0.3px;
}

.nav-link {
  position: relative;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #ffffff !important;
}

.nav-link.active {
  color: #ffffff !important;
  font-weight: 600;
}

@media (min-width: 992px) {
  .nav-link.active::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 2px;
    height: 2px;
    background: #198754;
    border-radius: 10px;
  }
}
</style>
