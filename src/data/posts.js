/**
 * posts.js — Single source of truth for all blog data.
 * Exports: CATEGORY_COLORS, CATEGORIES, posts
 * Consumed by: Blog.vue, BlogPost.vue, BlogCard.vue
 */

/** Maps each category to its distinct color palette used across cards, badges, and TOC. */
export const CATEGORY_COLORS = {
  'Data Engineering': { text: '#26cfff', bg: 'rgba(38,207,255,0.13)',  border: 'rgba(38,207,255,0.28)' },
  'Vue.js':           { text: '#4ade80', bg: 'rgba(74,222,128,0.13)',  border: 'rgba(74,222,128,0.28)' },
  'Architecture':     { text: '#fbbf24', bg: 'rgba(251,191,36,0.13)',  border: 'rgba(251,191,36,0.28)' },
  'DevOps':           { text: '#a78bfa', bg: 'rgba(167,139,250,0.13)', border: 'rgba(167,139,250,0.28)' },
  'Products':         { text: '#fb923c', bg: 'rgba(249,115,22,0.13)',  border: 'rgba(249,115,22,0.28)' },
}

/** Ordered list of filter categories. 'All' is always first. */
export const CATEGORIES = ['All', ...Object.keys(CATEGORY_COLORS)]

/** Full post data. Each entry is a self-contained article record. */
export const posts = [
  /* ─────────────────────────────────────────────────────── POST 1 ── */
  {
    id: 1,
    slug: 'fault-tolerant-etl-airflow-dbt',
    title: 'Building Fault-Tolerant ETL Pipelines with Apache Airflow and dbt',
    summary: 'A production-ready walkthrough of orchestrating complex data transformations with retry logic, alerting, and incremental loads — without writing a single line of manual SQL.',
    category: 'Data Engineering',
    readTime: 12,
    date: '2025-05-10',
    dateFormatted: 'May 10, 2025',
    emoji: '⚡',
    gradient: ['#00c6ff', '#9b5aff'],
    featured: true,
    tags: ['Apache Airflow', 'dbt', 'ETL', 'Python', 'Pipelines'],
    author: { name: 'Eduardo Castellanos', initials: 'EC', role: 'Senior Data Engineer' },
    initialComments: [
      { id: 1, author: 'María Torres', initials: 'MT', date: 'May 12, 2025', content: 'This is exactly the pattern we needed at my company. We had been running cron jobs for two years and the retry logic alone has saved us multiple times this month. Incremental loads cut our daily run from 4 hours to 22 minutes.' },
      { id: 2, author: 'James Liu', initials: 'JL', date: 'May 13, 2025', content: 'Great article. One thing worth adding: using Airflow\'s TaskGroup to organise the extract/transform/test steps per entity makes the graph much cleaner once you have 20+ models. Would love a follow-up on that pattern.' },
      { id: 3, author: 'Sofía Ramírez', initials: 'SR', date: 'May 15, 2025', content: 'The dbt incremental model with the is_incremental() macro was a game-changer for us. We had been doing full refreshes nightly on a 200M row table. Now it runs in under 5 minutes.' },
    ],
    content: `
<h2 id="problem">The Problem with Naive ETL Scripts</h2>
<p>Every data team starts the same way: a Python script on a cron job that reads from a source database, transforms data, and loads it into a warehouse. It works on day one. By day ninety, it is a liability you are afraid to touch.</p>
<p>The failure modes are predictable. A source schema change silently drops columns. A network timeout crashes the job at 3 AM and nobody notices until Monday morning standup. Worst of all: the script partially succeeds, leaving half-loaded tables that corrupt your dashboards and erode trust in the data team.</p>
<blockquote><p>"A pipeline that fails loudly is infinitely better than one that fails silently." — Every data engineer who has been paged at 3 AM.</p></blockquote>
<p>This article builds a production-grade ETL pipeline using Apache Airflow for orchestration and dbt for SQL transformations, with retry logic, data quality checks, and Slack alerting baked in from the start.</p>

<h2 id="airflow">Why Apache Airflow Changes Everything</h2>
<p>Airflow models your pipeline as a Directed Acyclic Graph (DAG). Each node is a task; each edge is a dependency. You get visualized lineage, per-task retry policies, backfill support, and a UI to debug failures without touching logs by hand.</p>
<pre><code class="language-python">from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import timedelta, date

default_args = {
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
    'email_on_failure': True,
    'email': ['data-alerts@company.com'],
}

with DAG('customer_pipeline', default_args=default_args,
         schedule_interval='@daily', start_date=date(2025, 1, 1)) as dag:
    extract   = BashOperator(task_id='extract',   bash_command='python extract.py')
    transform = BashOperator(task_id='transform', bash_command='dbt run --select customers')
    test      = BashOperator(task_id='test',      bash_command='dbt test --select customers')
    extract >> transform >> test</code></pre>
<p>Notice <code>retries: 3</code> with a 5-minute delay between attempts. If <code>extract</code> fails due to a transient network error, Airflow retries automatically. You sleep soundly.</p>

<h2 id="dbt">Integrating dbt for SQL Transformations</h2>
<p>dbt turns your warehouse into a version-controlled, tested, documented data platform. You write SELECT statements; dbt handles CREATE TABLE, dependency resolution, and incremental logic.</p>
<pre><code class="language-sql">-- models/silver/customers.sql
{{ config(materialized='incremental', unique_key='customer_id') }}

SELECT
    customer_id,
    LOWER(TRIM(email))      AS email,
    LOWER(TRIM(first_name)) AS first_name,
    updated_at
FROM {{ source('raw', 'customers') }}
{% if is_incremental() %}
    WHERE updated_at > (SELECT MAX(updated_at) FROM {{ this }})
{% endif %}</code></pre>
<p>On subsequent runs, only rows updated since the last load are processed. For a 50-million-row table, this cut our pipeline runtime from 45 minutes to under 3 minutes — a 94% reduction with no change to the business logic.</p>

<h2 id="quality">Data Quality as a First-Class Citizen</h2>
<p>dbt tests assert expectations directly against your data. Failing a test is a pipeline failure — exactly as it should be. These four tests should run on every model:</p>
<ul>
  <li><strong>not_null:</strong> Every primary key must be populated.</li>
  <li><strong>unique:</strong> No duplicate records in the output model.</li>
  <li><strong>accepted_values:</strong> Enumerated columns only contain known values.</li>
  <li><strong>relationships:</strong> Every foreign key references a valid parent record.</li>
</ul>
<p>We run <code>dbt test</code> as a separate Airflow task after each transformation step. If assertions fail, the DAG halts and our Slack channel receives a message with the exact failing test — no manual log digging required.</p>

<h2 id="monitoring">Monitoring and Alerting</h2>
<p>Airflow's callback hooks let you send rich failure notifications. Combine this with a Slack webhook and every failure alert includes the DAG name, failed task, run timestamp, and a direct link to the log — all without a third-party monitoring tool.</p>
<p>For SLA tracking, add the <code>sla</code> parameter to each operator. If a task takes longer than expected, Airflow notifies you proactively rather than after a user reports a stale dashboard.</p>

<h2 id="conclusion">Conclusion</h2>
<p>Airflow and dbt together are the current gold standard for teams that need reliable, auditable, and scalable data pipelines. Airflow owns <em>when</em> and <em>if</em>; dbt owns <em>how</em>.</p>
<p>The patterns here — incremental loads, retry logic, data quality gates — are not over-engineering. They are the minimum viable reliability for any pipeline serving a business that makes decisions from data. Start with this foundation and you will never fear a schema change again.</p>
`,
  },

  /* ─────────────────────────────────────────────────────── POST 2 ── */
  {
    id: 2,
    slug: 'pinia-patterns-vue3',
    title: 'Composable State Management: Pinia Patterns We Use Every Day',
    summary: 'Deep dive into advanced Pinia patterns — store composition, cross-store actions, persistence, and testing strategies that keep Vue 3 apps maintainable as they scale.',
    category: 'Vue.js',
    readTime: 8,
    date: '2025-04-28',
    dateFormatted: 'Apr 28, 2025',
    emoji: '🧩',
    gradient: ['#9b5aff', '#fbbf24'],
    featured: false,
    tags: ['Vue 3', 'Pinia', 'State Management', 'Composition API', 'Vitest'],
    author: { name: 'Eduardo Castellanos', initials: 'EC', role: 'Senior Data Engineer' },
    initialComments: [
      { id: 1, author: 'Andrea Kim', initials: 'AK', date: 'Apr 30, 2025', content: 'The cross-store import pattern solved a bug we\'d been chasing for two weeks. We were calling useAuthStore() at module level inside another store, which caused a getActivePinia() error on app startup. Moving it inside the store function fixed it instantly.' },
      { id: 2, author: 'Carlos Mendez', initials: 'CM', date: 'May 1, 2025', content: 'The result object pattern for actions is something every team should standardise on. We\'ve been throwing errors from actions and it made error handling inconsistent across our 40+ components. Switching to { success, error } changed everything.' },
    ],
    content: `
<h2 id="why-pinia">Why Pinia Replaced Vuex — for Good</h2>
<p>Vuex was the right tool for Vue 2. For Vue 3 with the Composition API, it feels like wearing a suit to the beach — technically correct, structurally uncomfortable. Pinia was built from scratch for Vue 3: no mutations, no namespacing boilerplate, full TypeScript inference, and Devtools support that actually works.</p>
<p>The API is delightfully minimal. A store is just a function that returns reactive state, computed values, and actions:</p>
<pre><code class="language-js">// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const total = computed(() => items.value.reduce((s, i) => s + i.price, 0))

  function add(item)  { items.value.push(item) }
  function remove(id) { items.value = items.value.filter(i => i.id !== id) }

  return { items, total, add, remove }
})</code></pre>
<p>This Setup Store pattern mirrors Vue's Composition API exactly. Your entire mental model for composables transfers directly to stores — no new concepts to learn.</p>

<h2 id="store-composition">Composing Stores: Importing One Store into Another</h2>
<p>Vuex required modules and namespacing for cross-store communication. Pinia lets you simply import one store inside another. The dependency is explicit, lazy-loaded, and tracked in Devtools.</p>
<pre><code class="language-js">// stores/user.js — imports authStore to gate profile loading
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth' // ← import at call site, not module level

export const useUserStore = defineStore('user', () => {
  const authStore = useAuthStore() // safe: Pinia is active when this runs
  const profile   = ref(null)

  async function loadProfile() {
    if (!authStore.isAuthenticated) return { success: false, error: 'Not authenticated' }
    const data   = await fetchProfile(authStore.user.id)
    profile.value = data
    return { success: true }
  }

  return { profile, loadProfile }
})</code></pre>
<p>Notice <code>useAuthStore()</code> is called inside the store function, not at the module's top level. Calling it at module level causes a "getActivePinia" error on app startup — the most common Pinia gotcha.</p>

<h2 id="persistence">Persisting State Across Sessions</h2>
<p>Cart data, user preferences, and auth tokens should survive a browser refresh. The cleanest pattern: initialise from localStorage in the store, and watch for changes to sync back.</p>
<pre><code class="language-js">const STORAGE_KEY = 'gd_cart'

const items = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

watch(items, (val) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
}, { deep: true })</code></pre>
<p>No plugin needed. This 4-line pattern handles 90% of persistence requirements. For multi-store, selective persistence, <code>pinia-plugin-persistedstate</code> is worth adding.</p>

<h2 id="testing">Testing Pinia Stores with Vitest</h2>
<p>Stores are plain functions — no component mounting, no browser environment needed. Create a fresh Pinia instance per test, call store actions, and assert on state:</p>
<pre><code class="language-js">import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../stores/cart'
import { describe, beforeEach, it, expect } from 'vitest'

describe('cartStore', () => {
  beforeEach(() => setActivePinia(createPinia()))

  it('adds an item and updates total', () => {
    const cart = useCartStore()
    cart.add({ id: 1, name: 'Starter Kit', price: 49 })
    expect(cart.items).toHaveLength(1)
    expect(cart.total).toBe(49)
  })
})</code></pre>

<h2 id="patterns">Three Patterns We Consider Non-Negotiable</h2>
<ul>
  <li><strong>Setup Stores over Options Stores:</strong> The Composition API syntax keeps your mental model consistent with components and composables. Pick one and stick to it across the entire project.</li>
  <li><strong>Actions always return a result object:</strong> Return <code>{ success: true, data }</code> or <code>{ success: false, error }</code>. Never throw from an action — let the component decide how to handle failures.</li>
  <li><strong>Import stores inside functions, not at module scope:</strong> Prevents the getActivePinia initialisation error that is notoriously hard to debug the first time you hit it.</li>
</ul>
<p>Pinia is not a framework — it is a thin layer of convention over Vue's reactivity system. The less you fight it, the more productive you become.</p>
`,
  },

  /* ─────────────────────────────────────────────────────── POST 3 ── */
  {
    id: 3,
    slug: 'medallion-architecture-bronze-silver-gold',
    title: 'Medallion Architecture in Practice: Bronze, Silver, and Gold Layers',
    summary: 'A real-world implementation of the Medallion architecture on a high-volume event stream, including the trade-offs nobody tells you about until you are already in production.',
    category: 'Architecture',
    readTime: 11,
    date: '2025-04-12',
    dateFormatted: 'Apr 12, 2025',
    emoji: '🏗️',
    gradient: ['#fbbf24', '#26cfff'],
    featured: false,
    tags: ['Data Architecture', 'Lakehouse', 'Delta Lake', 'Databricks', 'dbt'],
    author: { name: 'Eduardo Castellanos', initials: 'EC', role: 'Senior Data Engineer' },
    initialComments: [
      { id: 1, author: 'Priya Nair', initials: 'PN', date: 'Apr 15, 2025', content: 'The "when not to use Medallion" section saved us from over-engineering a simple pipeline. We had been planning three layers for a single data source with one downstream consumer. Your 1:1 anti-pattern test helped us simplify to a direct Bronze → Gold model.' },
      { id: 2, author: 'Thomas Weber', initials: 'TW', date: 'Apr 18, 2025', content: 'The deduplication query in the Silver layer is exactly what we needed. We\'ve been doing this with a Python script post-load and the performance was terrible on 500M rows. The QUALIFY window function approach runs in seconds.' },
    ],
    content: `
<h2 id="what-is-medallion">What Is the Medallion Architecture?</h2>
<p>The Medallion Architecture organises data in a lakehouse into three progressively refined layers — Bronze, Silver, and Gold — each with a specific quality contract. Data flows in one direction: raw in, analytics-ready out.</p>
<p>The metaphor is deliberate. Bronze is raw ore: messy, unprocessed, but complete. Silver is refined: cleansed, typed, and enriched. Gold is the finished product: business-ready aggregates that power dashboards and ML models.</p>
<blockquote><p>"In a lakehouse, the Medallion Architecture is not a best practice — it is the architecture. Everything else is an implementation detail." — Databricks Engineering Blog.</p></blockquote>

<h2 id="bronze-layer">Bronze Layer: Raw Ingestion</h2>
<p>Bronze is the landing zone. Data arrives exactly as the source emits it — no transformations, no schema enforcement, no quality checks. The single rule: never delete from Bronze. It is your system of record and your audit trail.</p>
<ul>
  <li><strong>Append-only.</strong> Deletes never happen at this layer.</li>
  <li><strong>Store source metadata:</strong> ingested_at, source_file, batch_id alongside the payload.</li>
  <li><strong>Use Delta or Parquet</strong> for efficient storage and time-travel queries.</li>
  <li><strong>Partition by ingestion date</strong> for performant downstream pruning.</li>
</ul>
<p>Bronze tables are typically not exposed to analysts. They exist for engineering traceability and reprocessing when business logic changes downstream.</p>

<h2 id="silver-layer">Silver Layer: Cleansed and Enriched</h2>
<p>Silver applies business logic to Bronze: deduplicate records, enforce data types, handle nulls, join to reference data, and standardise naming conventions. The output is a reliable, consistent, entity-level view of your data.</p>
<pre><code class="language-sql">-- silver.customers: deduplicated, typed, enriched
SELECT
    customer_id,
    CAST(email AS STRING)                        AS email,
    COALESCE(country_code, 'US')                 AS country_code,
    CAST(created_at AS TIMESTAMP)                AS created_at,
    ROW_NUMBER() OVER (PARTITION BY customer_id
                       ORDER BY updated_at DESC) AS _row_num
FROM bronze.raw_customers
QUALIFY _row_num = 1</code></pre>
<p>Silver is where data engineers spend most of their time — and where data quality tests must run. Catching issues at Silver prevents corruption of the Gold layer that analysts trust for their daily reports.</p>

<h2 id="gold-layer">Gold Layer: Business-Ready Aggregates</h2>
<p>Gold is optimised for consumption. Tables at this layer are wide, pre-aggregated, and named after business concepts — not source system table names. An analyst should query Gold without understanding the underlying sources.</p>
<p>Examples: <code>daily_revenue</code>, <code>monthly_active_users</code>, <code>product_performance</code>. These power BI dashboards, feed ML training pipelines, and drive product analytics — each with sub-second query times because the heavy lifting happened at Silver.</p>

<h2 id="when-to-use-it">When Medallion Makes Sense — and When It Doesn't</h2>
<p>Medallion shines with multiple source systems, multiple consumer teams, and a need for data lineage. It is the right choice for any data organisation that has outgrown a single ETL script.</p>
<p>It is overkill for a single-source, single-consumer pipeline where you control both ends. The anti-pattern: creating Gold tables with only one consumer and one source. If the ratio is 1:1, skip Silver entirely. Go Bronze → Gold directly and save the engineering overhead for problems that actually require it.</p>
`,
  },

  /* ─────────────────────────────────────────────────────── POST 4 ── */
  {
    id: 4,
    slug: 'zero-downtime-github-actions-vercel',
    title: 'Zero-Downtime Deployments with GitHub Actions and Vercel',
    summary: 'Setting up a CI/CD pipeline that lints, type-checks, and deploys preview URLs on every PR — with production deploys gated behind quality checks — all in under 3 minutes.',
    category: 'DevOps',
    readTime: 6,
    date: '2025-03-30',
    dateFormatted: 'Mar 30, 2025',
    emoji: '🚀',
    gradient: ['#a78bfa', '#26cfff'],
    featured: false,
    tags: ['GitHub Actions', 'Vercel', 'CI/CD', 'Vite', 'DevOps'],
    author: { name: 'Eduardo Castellanos', initials: 'EC', role: 'Senior Data Engineer' },
    initialComments: [
      { id: 1, author: 'Lucas Ferreira', initials: 'LF', date: 'Apr 2, 2025', content: 'The npm ci vs npm install point is subtle but important. We switched our CI to npm ci last quarter and eliminated flaky test failures caused by non-deterministic installs. Also noticed the setup step dropped from 90 seconds to about 12.' },
      { id: 2, author: 'Yuki Tanaka', initials: 'YT', date: 'Apr 5, 2025', content: 'The separate CI/CD file approach was exactly what we needed. Being able to re-trigger a Vercel production deployment without re-running tests saved us 4 minutes on a hotfix last week where we just needed to redeploy the same SHA.' },
    ],
    content: `
<h2 id="why-automate">Why Automate Your Frontend Pipeline?</h2>
<p>Manual deployments are a tax on your time and a risk to your users. Every push to main that bypasses linting is a potential regression in production. Every code review without a preview URL is conducted partially blind — reviewers cannot see what they are approving.</p>
<p>Our target: lint → type-check → test → preview deploy on every PR; production deploy on merge to main. Total pipeline time: under 3 minutes on a standard Vue 3 + Vite project.</p>

<h2 id="actions-workflow">The GitHub Actions CI Workflow</h2>
<p>Create <code>.github/workflows/ci.yml</code>. This single file handles the entire quality gate for pull requests:</p>
<pre><code class="language-yaml">name: CI

on:
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test -- --reporter=verbose</code></pre>
<p>The <code>actions/setup-node</code> step caches the npm dependency layer between runs, cutting setup from ~45 seconds to ~8 seconds after the first run. Always use <code>npm ci</code> — not <code>npm install</code> — in CI: it is deterministic, faster, and fails if package-lock.json is out of sync.</p>

<h2 id="vercel-preview">Vercel Preview Deployments</h2>
<p>Vercel's GitHub integration deploys a unique preview URL for every pull request automatically — no additional configuration needed after initial project setup. The URL is posted as a PR comment within 60 seconds of pushing code.</p>
<p>For fine-grained control, use the Vercel CLI in your workflow to set per-branch environment variables or skip deployments for documentation-only changes using path filters on the <code>on:</code> trigger.</p>

<h2 id="running-tests">Running Vitest Without a Browser</h2>
<p>Component tests that use <code>@vue/test-utils</code> need a DOM environment. In Node.js CI, use <code>jsdom</code> configured in <code>vitest.config.js</code>:</p>
<pre><code class="language-js">// vitest.config.js
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: { reporter: ['text', 'lcov'] },
  },
})</code></pre>

<h2 id="production">Separating CI from CD</h2>
<p>Production deploys should only trigger from main and only after all quality checks pass. Use a separate <code>deploy.yml</code> workflow that triggers on push to main:</p>
<pre><code class="language-yaml">name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: [] # Add job IDs from ci.yml if using reusable workflows
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'</code></pre>
<p>Separating CI and CD means you can re-trigger a production deployment for a hotfix without re-running the full test suite — saving 90 seconds when every second counts during an incident.</p>
`,
  },

  /* ─────────────────────────────────────────────────────── POST 5 ── */
  {
    id: 5,
    slug: 'launching-digital-product-30-days',
    title: 'Launching a Digital Product in 30 Days: Lessons from the Trenches',
    summary: 'Everything we got wrong (and right) building and shipping the first GeekDigital template pack — from validation to pricing to the exact launch sequence that generated $4,200 in 72 hours.',
    category: 'Products',
    readTime: 9,
    date: '2025-03-14',
    dateFormatted: 'Mar 14, 2025',
    emoji: '📦',
    gradient: ['#fb923c', '#9b5aff'],
    featured: false,
    tags: ['Product Launch', 'Digital Products', 'Stripe', 'Marketing', 'SaaS'],
    author: { name: 'Eduardo Castellanos', initials: 'EC', role: 'Senior Data Engineer' },
    initialComments: [
      { id: 1, author: 'Isabela Costa', initials: 'IC', date: 'Mar 17, 2025', content: 'The three-tier pricing section is gold. We launched our first course with a single price and left so much money on the table. Added a "Pro + coaching" tier this week and 40% of new buyers are choosing it. The anchoring effect is real.' },
      { id: 2, author: 'Daniel Park', initials: 'DP', date: 'Mar 20, 2025', content: 'Building in public is the single best marketing advice for a technical creator. I started posting weekly progress updates on X and went from 200 to 1,400 followers in 3 months. More importantly, 80% of my launch sales were from people who had been following the build.' },
    ],
    content: `
<h2 id="validate-first">Validate Before You Build Anything</h2>
<p>The most expensive mistake in digital product development is spending three months building something nobody wants. We have made this mistake. The fix is deceptively simple: sell the product before it fully exists.</p>
<p>We announced the Data Pipeline Starter Kit on a Monday with a landing page, a clear value proposition, and a "Pre-order" button linked to a Stripe payment link. By Friday we had 11 pre-orders at $49 each — enough signal to build with confidence, and $539 to fund the development time.</p>
<blockquote><p>"If you are embarrassed by your first version, you launched too late." — Reid Hoffman, co-founder of LinkedIn.</p></blockquote>
<p>The pre-order step also generates your first customer conversations. Every buyer who pre-ordered told us exactly what they hoped the product would solve. We built to their needs, not to our assumptions.</p>

<h2 id="build-in-public">Building in Public: The Compound Interest of Credibility</h2>
<p>We documented every week of the build on X and LinkedIn: architecture decisions, mistakes, half-finished screenshots, and early buyer feedback. By launch day, 340 people had followed the journey. Of those, 67 converted to paid customers in the first 48 hours — a conversion rate we attribute entirely to the trust built during the process.</p>
<p>The counter-intuitive lesson: showing imperfect work-in-progress builds more trust than presenting a polished final product. Audiences root for builders, not brands. Your mistakes and pivots are content.</p>

<h2 id="pricing">The Three-Tier Pricing Framework</h2>
<p>We tested three pricing tiers over the first two weeks, watching buyer behaviour closely:</p>
<ul>
  <li><strong>Starter — $49:</strong> Core template files and a written setup guide. Targeted at individual developers who learn by reading.</li>
  <li><strong>Professional — $129:</strong> Everything in Starter plus a 60-minute walkthrough video and 30 days of email support.</li>
  <li><strong>Team — $349:</strong> Professional license for up to 5 seats with a private Slack channel access for 90 days.</li>
</ul>
<p>The outcome: 60% of buyers chose Professional. The Starter tier anchored the price and made Professional feel reasonable; the Team tier made Professional feel like a steal. Classic pricing psychology — and it held up across both product launches we ran in Q1.</p>

<h2 id="launch-sequence">The 72-Hour Launch Sequence</h2>
<p>Our launch followed a specific cadence designed to maximise momentum without burning the audience:</p>
<ul>
  <li><strong>Hour 0:</strong> Email to pre-order list with an exclusive 20% discount code (expires in 48 hours).</li>
  <li><strong>Hour 2:</strong> Post on X and LinkedIn with a demo GIF and the purchase link.</li>
  <li><strong>Hour 24:</strong> "Behind the build" thread on X showing key architecture decisions.</li>
  <li><strong>Hour 48:</strong> Social proof post with the first buyer testimonial and their use case.</li>
  <li><strong>Hour 72:</strong> Last-chance email: discount expires at midnight. Subject line: "This closes tonight."</li>
</ul>
<p>The final-hour urgency email alone generated 18% of the total 72-hour revenue. Scarcity is uncomfortable to create but highly effective when the deadline is real.</p>

<h2 id="post-launch">Post-Launch: The Metrics That Actually Matter</h2>
<p>Vanity metrics — social impressions, site visits, email open rates — feel good but do not pay the server bill. Track three numbers that signal real product-market fit:</p>
<ul>
  <li><strong>Conversion rate:</strong> visitors who become buyers. Our first launch: 2.3%.</li>
  <li><strong>Refund rate:</strong> signal that the product delivers on its promise. Ours: 1.8%.</li>
  <li><strong>NPS:</strong> likelihood that a buyer recommends it. First cohort NPS: 68.</li>
</ul>
<p>The refund rate and NPS together told us the product was both useful and worth recommending. We used those numbers to justify building the next product in the catalog — which launched with a pre-existing audience already primed to buy.</p>
`,
  },
]

/** Returns a post by slug, or undefined if not found. */
export function getPostBySlug(slug) {
  return posts.find(p => p.slug === slug)
}

/** Returns the featured post (first one with featured: true), or the first post. */
export function getFeaturedPost() {
  return posts.find(p => p.featured) ?? posts[0]
}
