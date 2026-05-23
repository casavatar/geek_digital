<template>
  <div>
    <!-- Hero -->
    <!-- pt-16 clears the fixed navbar (h-16 = 64px). pt-12 inside adds breathing room →
         total 112px from viewport top, matching pt-28 pages (Catalog, Shop). -->
    <section class="glass-header pt-16">
      <div class="glass-header-ambient" />
      <div class="container-custom pt-12 pb-16 relative z-10">
        <div class="max-w-2xl">
          <div class="flex items-center gap-2 mb-4">
            <span class="glass-badge glass-badge-success">REST</span>
            <span class="glass-badge" style="background: rgba(251,191,36,0.12); color: #fbbf24; border-color: rgba(251,191,36,0.25)">v1.0.0</span>
          </div>
          <h1 class="text-4xl md:text-5xl font-display font-bold mb-4">
            <span class="gradient-text">API Reference</span>
          </h1>
          <p class="text-lg mb-6" style="color: var(--text-2)">
            Complete reference for the GeekDigital REST API. Manage products, users, orders, and more.
          </p>
          <div class="rounded-xl px-4 py-3 inline-flex items-center gap-3"
               style="background: var(--glass-bg-2); border: 1px solid var(--glass-border)">
            <span class="text-xs font-semibold uppercase tracking-wider" style="color: var(--text-3)">Base URL</span>
            <code class="text-sm font-mono" style="color: #26cfff">https://api.geekdigital.io/v1</code>
            <button @click="copyBaseUrl" class="btn btn-ghost py-1 px-2 text-xs">
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="luminous-divider" />

    <div class="container-custom py-16">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <nav class="sticky top-24 space-y-6">
            <div v-for="group in apiGroups" :key="group.title">
              <p class="text-xs font-semibold uppercase tracking-widest mb-2" style="color: var(--text-3)">{{ group.title }}</p>
              <ul class="space-y-1">
                <li v-for="item in group.items" :key="item.name">
                  <button
                    @click="activeGroup = item.name"
                    :class="['doc-link w-full text-left flex items-center gap-2', activeGroup === item.name && 'doc-link-active']"
                  >
                    <span class="method-badge" :class="`method-${item.method.toLowerCase()}`">{{ item.method }}</span>
                    <span class="truncate text-sm">{{ item.name }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <!-- Content -->
        <main class="lg:col-span-3 space-y-8">

          <!-- Authentication -->
          <div class="glass-card">
            <div class="glass-card-header">
              <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">Authentication</h2>
            </div>
            <div class="glass-card-body space-y-4">
              <p class="text-sm" style="color: var(--text-2)">
                All API requests must include a Bearer token in the
                <code class="inline-code">Authorization</code> header. Obtain a token via Firebase Authentication.
              </p>
              <pre class="code-block"><code>Authorization: Bearer &lt;your_firebase_id_token&gt;</code></pre>
              <div class="rounded-xl p-4" style="background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.2)">
                <p class="text-sm font-semibold mb-1" style="color: #fbbf24">Rate Limits</p>
                <p class="text-sm" style="color: var(--text-3)">
                  1,000 requests / hour per API key. Exceeding the limit returns
                  <code class="inline-code">429 Too Many Requests</code>.
                </p>
              </div>
            </div>
          </div>

          <!-- Endpoints -->
          <div v-for="ep in endpoints" :key="ep.path" class="glass-card">
            <div class="glass-card-header">
              <div class="flex items-center gap-3 flex-wrap">
                <span class="method-badge-lg" :class="`method-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
                <code class="text-sm font-mono" style="color: var(--text-1)">{{ ep.path }}</code>
                <span class="glass-badge text-xs" :class="ep.auth ? 'glass-badge-warning' : 'glass-badge-secondary'">
                  {{ ep.auth ? '🔒 Auth required' : 'Public' }}
                </span>
              </div>
              <p class="mt-2 text-sm" style="color: var(--text-2)">{{ ep.summary }}</p>
            </div>
            <div class="glass-card-body space-y-5">

              <!-- Parameters -->
              <div v-if="ep.params && ep.params.length">
                <p class="text-xs font-semibold uppercase tracking-wider mb-3" style="color: var(--text-3)">Parameters</p>
                <div class="overflow-x-auto rounded-xl" style="border: 1px solid var(--glass-border)">
                  <table class="api-table w-full text-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="param in ep.params" :key="param.name">
                        <td><code class="inline-code">{{ param.name }}</code></td>
                        <td><span class="glass-badge glass-badge-secondary text-xs">{{ param.type }}</span></td>
                        <td>
                          <span :class="param.required ? 'text-red-400' : ''">
                            {{ param.required ? 'Yes' : 'No' }}
                          </span>
                        </td>
                        <td style="color: var(--text-3)">{{ param.desc }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Request Body -->
              <div v-if="ep.request">
                <p class="text-xs font-semibold uppercase tracking-wider mb-2" style="color: var(--text-3)">Request Body</p>
                <pre class="code-block"><code>{{ ep.request }}</code></pre>
              </div>

              <!-- Response -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <p class="text-xs font-semibold uppercase tracking-wider" style="color: var(--text-3)">Response</p>
                  <span class="glass-badge glass-badge-success text-xs">200 OK</span>
                </div>
                <pre class="code-block"><code>{{ ep.response }}</code></pre>
              </div>
            </div>
          </div>

          <!-- Error Codes -->
          <div class="glass-card">
            <div class="glass-card-header">
              <h2 class="text-xl font-display font-bold" style="color: var(--text-1)">Error Codes</h2>
            </div>
            <div class="glass-card-body">
              <div class="overflow-x-auto rounded-xl" style="border: 1px solid var(--glass-border)">
                <table class="api-table w-full text-sm">
                  <thead>
                    <tr><th>Code</th><th>Status</th><th>Description</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="err in errorCodes" :key="err.code">
                      <td>
                        <code class="inline-code font-bold" :style="`color: ${err.color}`">{{ err.code }}</code>
                      </td>
                      <td style="color: var(--text-2)">{{ err.status }}</td>
                      <td style="color: var(--text-3)">{{ err.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeGroup = ref('List Products')
const copied = ref(false)

function copyBaseUrl() {
  navigator.clipboard.writeText('https://api.geekdigital.io/v1')
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const apiGroups = [
  {
    title: 'Products',
    items: [
      { name: 'List Products',   method: 'GET' },
      { name: 'Get Product',     method: 'GET' },
      { name: 'Create Product',  method: 'POST' },
      { name: 'Update Product',  method: 'PUT' },
    ]
  },
  {
    title: 'Orders',
    items: [
      { name: 'Create Order', method: 'POST' },
      { name: 'Get Order',    method: 'GET' },
      { name: 'List Orders',  method: 'GET' },
    ]
  },
  {
    title: 'Users',
    items: [
      { name: 'Get Profile',    method: 'GET' },
      { name: 'Update Profile', method: 'PUT' },
    ]
  }
]

const endpoints = [
  {
    method: 'GET',
    path: '/products',
    summary: 'Returns a paginated list of all available digital products.',
    auth: false,
    params: [
      { name: 'page',     type: 'integer', required: false, desc: 'Page number (default: 1)' },
      { name: 'limit',    type: 'integer', required: false, desc: 'Items per page, max 100 (default: 20)' },
      { name: 'category', type: 'string',  required: false, desc: 'Filter by product category' },
    ],
    request: null,
    response: `{
  "data": [
    {
      "id": "prod_01HXYZ",
      "name": "Data Pipeline Starter Kit",
      "category": "templates",
      "price": 49.00,
      "currency": "USD",
      "created_at": "2024-11-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 48
  }
}`
  },
  {
    method: 'POST',
    path: '/orders',
    summary: 'Creates a new order and initiates the payment session via Stripe.',
    auth: true,
    params: null,
    request: `{
  "product_id": "prod_01HXYZ",
  "payment_method": "stripe",
  "coupon_code": "LAUNCH20"
}`,
    response: `{
  "order_id": "ord_9fKq2m",
  "status": "pending",
  "checkout_url": "https://checkout.stripe.com/pay/cs_live_...",
  "expires_at": "2024-11-15T12:30:00Z"
}`
  },
  {
    method: 'GET',
    path: '/users/me',
    summary: "Returns the authenticated user's profile, licenses, and purchase history.",
    auth: true,
    params: null,
    request: null,
    response: `{
  "id": "usr_aB3cD4",
  "email": "user@example.com",
  "display_name": "Eduardo Castellanos",
  "licenses": [
    {
      "product_id": "prod_01HXYZ",
      "key": "GD-XXXX-XXXX-XXXX",
      "activated_at": "2024-11-10T08:00:00Z"
    }
  ],
  "created_at": "2024-09-01T00:00:00Z"
}`
  }
]

const errorCodes = [
  { code: 400, status: 'Bad Request',           desc: 'The request body or parameters are invalid.',          color: '#fbbf24' },
  { code: 401, status: 'Unauthorized',           desc: 'Missing or invalid Bearer token.',                     color: '#f87171' },
  { code: 403, status: 'Forbidden',              desc: 'Valid token, but insufficient permissions.',            color: '#f87171' },
  { code: 404, status: 'Not Found',              desc: 'The requested resource does not exist.',               color: '#94a3b8' },
  { code: 422, status: 'Unprocessable Entity',   desc: 'Validation failed on the request payload.',            color: '#fbbf24' },
  { code: 429, status: 'Too Many Requests',      desc: 'Rate limit exceeded. Retry after the indicated period.', color: '#f97316' },
  { code: 500, status: 'Internal Server Error',  desc: 'An unexpected error occurred on our end.',             color: '#f87171' },
]
</script>

<style scoped>
.doc-link {
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  color: var(--text-3);
  transition: all 0.15s ease;
  cursor: pointer;
  background: transparent;
  border: none;
}
.doc-link:hover { color: var(--text-1); background: var(--glass-bg-2); }
.doc-link-active { color: #26cfff !important; background: rgba(38,207,255,0.08) !important; font-weight: 500; }

.method-badge {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 1px 5px;
  border-radius: 3px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.method-badge-lg {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 4px;
  flex-shrink: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.method-get    { background: rgba(38,207,255,0.15); color: #26cfff; }
.method-post   { background: rgba(74,222,128,0.15); color: #4ade80; }
.method-put    { background: rgba(251,191,36,0.15); color: #fbbf24; }
.method-delete { background: rgba(248,113,113,0.15); color: #f87171; }

.code-block {
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--glass-border);
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 0.78rem;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  color: #e2e8f0;
  overflow-x: auto;
  white-space: pre;
  line-height: 1.6;
}
.inline-code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8em;
  background: rgba(38, 207, 255, 0.1);
  color: #26cfff;
  padding: 1px 5px;
  border-radius: 3px;
}
.api-table th {
  text-align: left;
  padding: 0.5rem 0.875rem;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-3);
  border-bottom: 1px solid var(--glass-border);
  background: var(--glass-bg-2);
}
.api-table td {
  padding: 0.65rem 0.875rem;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  vertical-align: middle;
  color: var(--text-2);
}
.api-table tr:last-child td { border-bottom: none; }
</style>
