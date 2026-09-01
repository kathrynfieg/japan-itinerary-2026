<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import logo from '../assets/3.png'
import appMockup from '../assets/app-mockup.png'

const emit = defineEmits<{
  start: []
  trips: []
}>()

const previewHero =
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'
</script>

<template>
  <div class="landing">
    <header class="landing__nav">
      <div class="landing__nav-inner">
        <div class="landing__brand">
          <img
            class="landing__mark"
            :src="logo"
            alt=""
            width="40"
            height="40"
          />
          <span>Daymark</span>
        </div>
        <nav class="landing__nav-links" aria-label="Product">
          <a href="#pricing" class="landing__nav-link">Pricing</a>
          <a href="#features" class="landing__nav-link">Features</a>
          <button type="button" class="landing__nav-link">How it works</button>
        </nav>
        <div class="landing__nav-actions">
          <button type="button" class="landing__nav-text" @click="emit('trips')">
            Log in
          </button>
          <button type="button" class="landing__nav-cta" @click="emit('start')">
            Start free
          </button>
        </div>
      </div>
    </header>

    <section class="landing__hero">
      <div class="landing__hero-copy">
        <h1 class="landing__title">The simple itinerary app.</h1>
        <p class="landing__lede">
          Plan the days ahead, keep up with your trip as it unfolds, and hold
          onto the memories afterwards.
        </p>
        <div class="landing__hero-actions">
          <button type="button" class="landing__cta" @click="emit('start')">
            Start a trip
            <ArrowRight :size="16" :stroke-width="2.25" aria-hidden="true" />
          </button>
          <p class="landing__hero-note">Free to try · no account needed</p>
        </div>
      </div>

      <div class="landing__hero-visual">
        <img
          class="landing__hero-mockup"
          :src="appMockup"
          alt="Daymark on laptop and phone — Japan 2026 trip hero and day timeline"
          width="2400"
          height="1600"
        />
      </div>
    </section>

    <section class="landing__features" id="features">
      <div class="landing__features-inner">
        <header class="landing__features-header">
          <h2 class="landing__features-title">Everything you need. Nothing you don’t.</h2>
          <p class="landing__features-lede">
            A few quiet tools for planning, travelling, and remembering.
          </p>
        </header>

        <div class="landing__feature-stack">
          <article class="landing__feature">
            <div class="landing__feature-copy">
              <p class="landing__feature-eyebrow">Plan</p>
              <h3 class="landing__feature-name">Sketch every day before you go</h3>
              <p class="landing__feature-desc">
                Build a calm day-by-day timeline — places, times, notes, and tickets —
                so the trip feels clear long before you land.
              </p>
            </div>

            <div class="landing__feature-stage" aria-hidden="true">
              <div class="landing__preview landing__preview--plan">
                <div class="landing__preview-glow" />
                <div class="landing__preview-panel">
                  <header class="landing__preview-head">
                    <span class="landing__preview-kicker">Day 2</span>
                    <h4 class="landing__preview-title">Arrival in Tokyo</h4>
                    <p class="landing__preview-meta">22 Jul · Wednesday</p>
                  </header>
                  <ul class="landing__preview-timeline">
                    <li class="landing__preview-stop">
                      <span class="landing__preview-dot" />
                      <time>11:00</time>
                      <div>
                        <p class="landing__preview-stop-title">Early check-in</p>
                        <p class="landing__preview-stop-place">Shinjuku</p>
                      </div>
                      <span class="landing__preview-chip">Stay</span>
                    </li>
                    <li class="landing__preview-stop">
                      <span class="landing__preview-dot" />
                      <time>14:30</time>
                      <div>
                        <p class="landing__preview-stop-title">Shibuya Sky</p>
                        <p class="landing__preview-stop-place">Shibuya</p>
                      </div>
                      <span class="landing__preview-chip">Sight</span>
                    </li>
                    <li class="landing__preview-stop landing__preview-stop--active">
                      <span class="landing__preview-dot" />
                      <time>18:00</time>
                      <div>
                        <p class="landing__preview-stop-title">teamLab Borderless</p>
                        <p class="landing__preview-stop-place">Azabudai Hills</p>
                      </div>
                      <span class="landing__preview-chip">Booked</span>
                    </li>
                    <li class="landing__preview-stop">
                      <span class="landing__preview-dot" />
                      <time>21:00</time>
                      <div>
                        <p class="landing__preview-stop-title">Ramen near hotel</p>
                        <p class="landing__preview-stop-place">Shinjuku</p>
                      </div>
                      <span class="landing__preview-chip">Food</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article class="landing__feature landing__feature--reverse">
            <div class="landing__feature-copy">
              <p class="landing__feature-eyebrow">Travel</p>
              <h3 class="landing__feature-name">Stay with what’s next</h3>
              <p class="landing__feature-desc">
                On the road, Daymark keeps today in focus — the current stop, the
                next one, and just enough detail to move without hunting.
              </p>
            </div>

            <div class="landing__feature-stage" aria-hidden="true">
              <div class="landing__preview landing__preview--pace">
                <div class="landing__preview-glow landing__preview-glow--warm" />
                <div class="landing__phone">
                  <div class="landing__phone-notch" />
                  <div class="landing__phone-screen">
                    <p class="landing__phone-today">Today · Day 2</p>
                    <h4 class="landing__phone-heading">What’s next</h4>
                    <div class="landing__phone-now">
                      <span class="landing__phone-pulse" />
                      <div>
                        <p class="landing__phone-now-label">Now</p>
                        <p class="landing__phone-now-title">Shibuya Sky</p>
                        <p class="landing__phone-now-meta">14:30 · tickets in Key links</p>
                      </div>
                    </div>
                    <div class="landing__phone-next">
                      <time>18:00</time>
                      <div>
                        <p>teamLab Borderless</p>
                        <span>Azabudai Hills · 25 min</span>
                      </div>
                    </div>
                    <div class="landing__phone-next landing__phone-next--muted">
                      <time>21:00</time>
                      <div>
                        <p>Ramen near hotel</p>
                        <span>Shinjuku</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="landing__feature">
            <div class="landing__feature-copy">
              <p class="landing__feature-eyebrow">Remember</p>
              <h3 class="landing__feature-name">Keep the shape of the trip</h3>
              <p class="landing__feature-desc">
                When you’re home, the days stay intact — where you went, what you
                planned, and the quiet arc of the journey, not just a camera roll.
              </p>
            </div>

            <div class="landing__feature-stage" aria-hidden="true">
              <div class="landing__preview landing__preview--memory">
                <div class="landing__preview-glow" />
                <div class="landing__memory">
                  <div class="landing__memory-photo">
                    <img
                      :src="previewHero"
                      alt=""
                      width="900"
                      height="600"
                    />
                    <div class="landing__memory-veil" />
                    <div class="landing__memory-caption">
                      <p class="landing__memory-trip">Japan 2026</p>
                      <p class="landing__memory-range">21 – 31 July</p>
                    </div>
                  </div>
                  <div class="landing__memory-stats">
                    <div>
                      <span class="landing__memory-num">11</span>
                      <span class="landing__memory-label">days</span>
                    </div>
                    <div>
                      <span class="landing__memory-num">4</span>
                      <span class="landing__memory-label">cities</span>
                    </div>
                    <div>
                      <span class="landing__memory-num">38</span>
                      <span class="landing__memory-label">stops</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="landing__pricing" id="pricing">
      <div class="landing__pricing-inner">
        <header class="landing__pricing-header">
          <h2 class="landing__pricing-title">Simple pricing.</h2>
          <p class="landing__pricing-lede">
            Free to start. Pro is billed once a year — no monthly plans.
          </p>
        </header>

        <div class="landing__pricing-plans">
          <article class="landing__plan">
            <h3 class="landing__plan-name">Free</h3>
            <p class="landing__plan-price">
              <span class="landing__plan-amount">$0</span>
              <span class="landing__plan-period">forever</span>
            </p>
            <p class="landing__plan-summary">
              Enough to plan one trip, day by day.
            </p>
            <ul class="landing__plan-features">
              <li>One active trip</li>
              <li>Days, places and notes</li>
              <li>Works on phone and desktop</li>
            </ul>
            <button
              type="button"
              class="landing__plan-cta"
              @click="emit('start')"
            >
              Start free
            </button>
          </article>

          <article class="landing__plan landing__plan--pro">
            <h3 class="landing__plan-name">Pro</h3>
            <p class="landing__plan-price">
              <span class="landing__plan-amount">$48</span>
              <span class="landing__plan-period">/ year</span>
            </p>
            <p class="landing__plan-summary">
              For travellers who keep more than one trip going.
            </p>
            <ul class="landing__plan-features">
              <li>Unlimited trips</li>
              <li>Share with companions</li>
              <li>Export and offline access</li>
            </ul>
            <button type="button" class="landing__plan-cta landing__plan-cta--pro">
              Coming soon
            </button>
          </article>
        </div>
      </div>
    </section>

    <section class="landing__closing">
      <div class="landing__closing-inner">
        <p class="landing__closing-line">Just your trip, day by day.</p>
        <button type="button" class="landing__cta landing__cta--dark" @click="emit('start')">
          Start a trip
          <ArrowRight :size="16" :stroke-width="2.25" aria-hidden="true" />
        </button>
      </div>
    </section>

    <footer class="landing__footer">
      <div class="landing__footer-inner">
        <span class="landing__footer-brand">Daymark</span>
        <span class="landing__footer-note">Plan · travel · remember</span>
      </div>
    </footer>
  </div>
</template>
