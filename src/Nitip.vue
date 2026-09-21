```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="home-page">

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center min-vh-75">

          <!-- Left Content -->
          <div class="col-lg-7">
            <div class="hero-badge mb-3">
              <span class="badge-dot"></span>
              Laravel 12 × Vue 3
            </div>

            <h1 class="display-3 fw-bold mb-4">
              REST API
              <br />
              <span class="text-success">Management System</span>
            </h1>

            <p class="lead text-secondary mb-4 hero-description">
              Aplikasi sederhana untuk mempelajari konsep REST API
              menggunakan Laravel 12 sebagai backend dan Vue 3
              dengan TypeScript sebagai frontend.
            </p>

            <div class="d-flex flex-wrap gap-3">
              <RouterLink
                to="/products"
                class="btn btn-success btn-lg px-4"
              >
                Explore Products
              </RouterLink>

              <RouterLink
                to="/categories"
                class="btn btn-outline-dark btn-lg px-4"
              >
                View Categories
              </RouterLink>
            </div>
          </div>

          <!-- Right Illustration -->
          <div class="col-lg-5 mt-5 mt-lg-0">
            <div class="api-card">

              <div class="api-card-header">
                <div class="window-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span class="small text-secondary">
                  api.example.com
                </span>
              </div>

              <div class="api-content">
                <div class="api-line">
                  <span class="method get">GET</span>
                  <span>/api/products</span>
                </div>

                <div class="api-line">
                  <span class="method post">POST</span>
                  <span>/api/products</span>
                </div>

                <div class="api-line">
                  <span class="method put">PUT</span>
                  <span>/api/products/{id}</span>
                </div>

                <div class="api-line">
                  <span class="method delete">DELETE</span>
                  <span>/api/products/{id}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features-section py-5">
      <div class="container">

        <div class="text-center mb-5">
          <span class="text-success fw-semibold">
            FEATURES
          </span>

          <h2 class="fw-bold mt-2">
            What You Can Manage
          </h2>

          <p class="text-secondary">
            Kelola data melalui REST API yang terhubung dengan Vue.
          </p>
        </div>

        <div class="row g-4">

          <!-- Products -->
          <div class="col-md-4">
            <div class="feature-card h-100">
              <div class="feature-icon bg-success-subtle text-success">
                📦
              </div>

              <h4 class="fw-bold mt-4">
                Products
              </h4>

              <p class="text-secondary">
                Menampilkan, menambahkan, mengubah, dan menghapus
                data produk melalui REST API.
              </p>

              <RouterLink
                to="/products"
                class="text-success text-decoration-none fw-semibold"
              >
                Manage Products →
              </RouterLink>
            </div>
          </div>

          <!-- Categories -->
          <div class="col-md-4">
            <div class="feature-card h-100">
              <div class="feature-icon bg-primary-subtle text-primary">
                🗂️
              </div>

              <h4 class="fw-bold mt-4">
                Categories
              </h4>

              <p class="text-secondary">
                Mengelola kategori produk dan menghubungkannya
                dengan data products.
              </p>

              <RouterLink
                to="/categories"
                class="text-primary text-decoration-none fw-semibold"
              >
                Manage Categories →
              </RouterLink>
            </div>
          </div>

          <!-- REST API -->
          <div class="col-md-4">
            <div class="feature-card h-100">
              <div class="feature-icon bg-dark-subtle text-dark">
                ⚡
              </div>

              <h4 class="fw-bold mt-4">
                REST API
              </h4>

              <p class="text-secondary">
                Backend Laravel menyediakan endpoint API yang
                digunakan oleh frontend Vue.
              </p>

              <span class="text-dark fw-semibold">
                Laravel 12 + Vue 3
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="cta-section py-5">
      <div class="container">
        <div class="cta-card text-center p-5">

          <h2 class="fw-bold">
            Ready to explore the API?
          </h2>

          <p class="text-secondary mb-4">
            Mulai dengan melihat daftar products yang tersedia.
          </p>

          <RouterLink
            to="/products"
            class="btn btn-dark px-4 py-2"
          >
            Get Started →
          </RouterLink>

        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-page {
  background: #ffffff;
}

/* Hero */
.hero-section {
  background:
    radial-gradient(
      circle at 85% 20%,
      rgba(25, 135, 84, 0.10),
      transparent 35%
    ),
    #f8f9fa;
}

.min-vh-75 {
  min-height: 75vh;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 50px;
  background: #e9f7ef;
  color: #198754;
  font-size: 14px;
  font-weight: 600;
}

.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #198754;
}

.hero-description {
  max-width: 650px;
  line-height: 1.8;
}

/* API Card */
.api-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.10);
  border: 1px solid #e9ecef;
  transform: rotate(2deg);
  transition: 0.3s ease;
}

.api-card:hover {
  transform: rotate(0deg) translateY(-5px);
}

.api-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.window-dots {
  display: flex;
  gap: 6px;
}

.window-dots span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #adb5bd;
}

.api-content {
  padding: 25px;
  font-family: monospace;
}

.api-line {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 0;
  font-size: 14px;
  border-bottom: 1px solid #f1f3f5;
}

.api-line:last-child {
  border-bottom: none;
}

.method {
  width: 60px;
  text-align: center;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: bold;
}

.get {
  color: #0d6efd;
  background: #e7f1ff;
}

.post {
  color: #198754;
  background: #e9f7ef;
}

.put {
  color: #fd7e14;
  background: #fff3e6;
}

.delete {
  color: #dc3545;
  background: #fdebed;
}

/* Features */
.features-section {
  background: #ffffff;
}

.feature-card {
  padding: 30px;
  border: 1px solid #e9ecef;
  border-radius: 18px;
  background: #ffffff;
  transition: 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  font-size: 24px;
}

/* CTA */
.cta-section {
  background: #f8f9fa;
}

.cta-card {
  border-radius: 20px;
  background: #e9f7ef;
}

/* Mobile */
@media (max-width: 991px) {
  .min-vh-75 {
    min-height: auto;
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .display-3 {
    font-size: 2.8rem;
  }

  .api-card {
    transform: none;
  }
}
</style>
```
