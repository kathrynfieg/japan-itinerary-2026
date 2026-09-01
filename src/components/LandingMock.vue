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
