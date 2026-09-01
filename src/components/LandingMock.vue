<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import logo from '../assets/3.png'
import appMockup from '../assets/app-mockup.png'

const emit = defineEmits<{
  start: []
  trips: []
}>()
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
          <button type="button" class="landing__nav-link">Pricing</button>
          <button type="button" class="landing__nav-link">Features</button>
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

        <ul class="landing__features-list">
          <li class="landing__features-item">
            <h3 class="landing__features-name">Plan the days</h3>
            <p class="landing__features-desc">
              Sketch each day before you go — places, notes, and the things that matter.
            </p>
          </li>
          <li class="landing__features-item">
            <h3 class="landing__features-name">Keep pace</h3>
            <p class="landing__features-desc">
              Update as the trip unfolds so you’re always looking at what’s next.
            </p>
          </li>
          <li class="landing__features-item">
            <h3 class="landing__features-name">Look back</h3>
            <p class="landing__features-desc">
              Hold onto the shape of the trip when you’re home — not just the photos.
            </p>
          </li>
        </ul>

        <div class="landing__features-placeholder" aria-hidden="true">
          <span class="landing__features-placeholder-label">Preview coming soon</span>
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
