<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import logoWhite from '../assets/3-white.png'

const emit = defineEmits<{
  start: []
  trips: []
}>()

const heroImage =
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80'
</script>

<template>
  <div class="landing">
    <header class="landing__nav">
      <div class="landing__nav-inner">
        <div class="landing__brand">
          <img
            class="landing__mark"
            :src="logoWhite"
            alt=""
            width="40"
            height="40"
          />
          <span>Daymark</span>
        </div>
        <button type="button" class="landing__nav-link" @click="emit('trips')">
          Your trips
        </button>
      </div>
    </header>

    <section class="landing__hero">
      <img
        class="landing__hero-image"
        :src="heroImage"
        alt="Traditional street in Kyoto at dusk"
        width="2400"
        height="1600"
      />
      <div class="landing__hero-veil" aria-hidden="true" />
      <div class="landing__hero-glow" aria-hidden="true" />

      <div class="landing__hero-content">
        <p class="landing__eyebrow">The simple itinerary app.</p>
        <h1 class="landing__title">
          Plan your trip, or remember it as you go.
        </h1>
        <p class="landing__lede">
          Plan the days ahead, keep up with your trip as it unfolds, and hold
          onto the memories afterwards.
        </p>
        <button type="button" class="landing__cta" @click="emit('start')">
          Start a trip
          <ArrowRight :size="16" :stroke-width="2.25" aria-hidden="true" />
        </button>
      </div>
    </section>

    <section class="landing__feature">
      <div class="landing__feature-inner">
        <div class="landing__feature-copy">
          <h2 class="landing__feature-title">
            Your trip, without the travel planner clutter.
          </h2>
          <div class="landing__feature-body">
            <p>
              Daymark is a lightweight companion for organising what you want
              to do each day.
            </p>
            <p>
              Add places, plans and notes before you go. Update things as your
              trip unfolds. Look back on it when you are home.
            </p>
            <p class="landing__feature-quiet">
              No complicated planning system. No endless setup.
            </p>
            <p class="landing__feature-close">Just your trip, day by day.</p>
          </div>
        </div>

        <div class="landing__preview" aria-hidden="true">
          <div class="landing__preview-device">
            <div class="landing__preview-top">
              <span class="landing__preview-brand">Japan 2026</span>
              <span class="landing__preview-range">21 – 31 July</span>
            </div>
            <div class="landing__preview-days">
              <span class="landing__preview-day landing__preview-day--on"
                >21</span
              >
              <span class="landing__preview-day">22</span>
              <span class="landing__preview-day">23</span>
              <span class="landing__preview-day">24</span>
              <span class="landing__preview-day">25</span>
            </div>
            <div class="landing__preview-card">
              <p class="landing__preview-daylabel">Day 1 · Tokyo</p>
              <ul class="landing__preview-list">
                <li>
                  <span class="landing__preview-chip">✈️</span>
                  Arrive Haneda
                </li>
                <li>
                  <span class="landing__preview-chip">🏨</span>
                  Check in Shibuya
                </li>
                <li>
                  <span class="landing__preview-chip">🍜</span>
                  Dinner in Ueno
                </li>
              </ul>
            </div>
            <div class="landing__preview-card landing__preview-card--muted">
              <p class="landing__preview-daylabel">Day 2 · Tokyo</p>
              <p class="landing__preview-note">TeamLab, Shibuya Sky, izakaya…</p>
            </div>
          </div>
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
