<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  FileText,
  Link2,
  MapPin,
  Share2,
} from '@lucide/vue'
import logo from '../assets/3.png'
import appMockup from '../assets/app-mockup.png'

const emit = defineEmits<{
  start: []
  trips: []
}>()

const previewHero =
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80'

const features = [
  {
    id: 'day-by-day',
    name: 'Day by day',
    lead: 'A simple itinerary for every day of your trip.',
    detail: 'Add places, activities and plans without overcomplicating things.',
  },
  {
    id: 'together',
    name: 'Keep it all together',
    lead: 'Notes, links and attachments in one place.',
    detail: 'Keep bookings, tickets and useful details with your trip.',
  },
  {
    id: 'share',
    name: 'Share your trip',
    lead: 'Send one simple view to anyone.',
    detail: 'Share your itinerary without needing them to sign up.',
  },
  {
    id: 'memory',
    name: 'Keep the memory',
    lead: 'Your itinerary stays with you after the trip.',
    detail: 'Look back on where you went and what you did.',
  },
] as const

const faqs = [
  {
    question: 'What is Daymark?',
    answer: [
      'Daymark is a simple itinerary app for planning your trip and keeping track of it as you go.',
    ],
  },
  {
    question: 'Who is Daymark for?',
    answer: [
      'Anyone who wants a simple way to organise a trip without using a full travel planner.',
      'It works especially well for solo trips, couples, families and groups who just want a clear itinerary they can easily share.',
    ],
  },
  {
    question: 'Is Daymark a full travel planner?',
    answer: [
      'No. Daymark is intentionally lightweight. It helps you organise your days without all the extra travel planning clutter.',
    ],
  },
  {
    question: 'Do I need to download an app?',
    answer: [
      'No. Daymark works in your browser on phone, tablet and desktop, with no download required.',
      'It is designed to work simply on the go, so your itinerary is always easy to access wherever you are.',
    ],
  },
  {
    question: 'Can I use Daymark while I’m travelling?',
    answer: [
      'Yes. Check your plans, make changes and add notes as your trip unfolds.',
    ],
  },
  {
    question: 'Can I share my itinerary?',
    answer: [
      'Yes. Share your trip with a simple link. Viewers do not need an account or sign in.',
    ],
  },
  {
    question: 'Does Daymark use AI?',
    answer: [
      'Not right now. Daymark is intentionally simple and puts you in control of your trip.',
      'No generated itineraries, no unnecessary suggestions, no extra noise. Just an easy place to plan your days your way.',
    ],
  },
] as const

const openFaq = ref(0)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? -1 : index
}

const featureIndex = ref(0)
const touchStartX = ref<number | null>(null)

const activeFeature = computed(() => features[featureIndex.value])

function goToFeature(index: number) {
  const total = features.length
  featureIndex.value = ((index % total) + total) % total
}

function nextFeature() {
  goToFeature(featureIndex.value + 1)
}

function prevFeature() {
  goToFeature(featureIndex.value - 1)
}

function onTouchStart(event: TouchEvent) {
  touchStartX.value = event.changedTouches[0]?.clientX ?? null
}

function onTouchEnd(event: TouchEvent) {
  if (touchStartX.value == null) return
  const endX = event.changedTouches[0]?.clientX
  if (endX == null) {
    touchStartX.value = null
    return
  }

  const delta = endX - touchStartX.value
  touchStartX.value = null

  if (Math.abs(delta) < 48) return
  if (delta < 0) nextFeature()
  else prevFeature()
}
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
          <a href="#features" class="landing__nav-link">Features</a>
          <a href="#pricing" class="landing__nav-link">Pricing</a>
          <a href="#faq" class="landing__nav-link">FAQ</a>
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

        <div
          class="landing__carousel"
          @touchstart.passive="onTouchStart"
          @touchend.passive="onTouchEnd"
        >
          <div
            class="landing__carousel-tabs"
            role="tablist"
            aria-label="Features"
          >
            <button
              v-for="(feature, index) in features"
              :id="`feature-tab-${feature.id}`"
              :key="feature.id"
              type="button"
              class="landing__carousel-tab"
              role="tab"
              :aria-selected="featureIndex === index"
              :aria-controls="`feature-panel-${feature.id}`"
              :tabindex="featureIndex === index ? 0 : -1"
              :class="{ 'landing__carousel-tab--active': featureIndex === index }"
              @click="goToFeature(index)"
            >
              {{ feature.name }}
            </button>
          </div>

          <div class="landing__carousel-frame">
            <div
              class="landing__carousel-track"
              :style="{ transform: `translateX(-${featureIndex * 100}%)` }"
            >
              <article
                v-for="(feature, index) in features"
                :id="`feature-panel-${feature.id}`"
                :key="feature.id"
                class="landing__feature"
                role="tabpanel"
                :aria-labelledby="`feature-tab-${feature.id}`"
                :aria-hidden="featureIndex !== index"
              >
                <div class="landing__feature-copy">
                  <p class="landing__feature-count">
                    {{ String(index + 1).padStart(2, '0') }}
                    <span aria-hidden="true">/</span>
                    {{ String(features.length).padStart(2, '0') }}
                  </p>
                  <h3 class="landing__feature-name">{{ feature.name }}</h3>
                  <p class="landing__feature-desc">{{ feature.lead }}</p>
                  <p class="landing__feature-detail">{{ feature.detail }}</p>
                </div>

                <div class="landing__feature-stage" aria-hidden="true">
                  <div
                    v-if="feature.id === 'day-by-day'"
                    class="landing__preview landing__preview--plan"
                  >
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

                  <div
                    v-else-if="feature.id === 'together'"
                    class="landing__preview landing__preview--together"
                  >
                    <div class="landing__preview-glow landing__preview-glow--warm" />
                    <div class="landing__together">
                      <div class="landing__together-card">
                        <div class="landing__together-stop">
                          <div class="landing__together-time">
                            <span class="landing__together-dot" />
                            <time>14:30</time>
                          </div>
                          <div class="landing__together-body">
                            <div class="landing__together-title-row">
                              <h4 class="landing__together-title">Shibuya Sky</h4>
                              <span class="landing__together-chip">Sight</span>
                            </div>
                            <p class="landing__together-place">
                              <MapPin :size="13" :stroke-width="2.25" aria-hidden="true" />
                              Shibuya Scramble Square
                            </p>
                            <ul class="landing__together-notes">
                              <li>Booked for sunset — arrive 15 min early</li>
                              <li>Tickets are under Jess’s name</li>
                            </ul>
                            <div class="landing__together-links">
                              <span class="landing__together-link">
                                Ticket confirmation
                                <ExternalLink :size="12" :stroke-width="2.25" aria-hidden="true" />
                              </span>
                              <span class="landing__together-link">
                                Maps
                                <ExternalLink :size="12" :stroke-width="2.25" aria-hidden="true" />
                              </span>
                            </div>
                            <div class="landing__together-files">
                              <span class="landing__together-file">
                                <span class="landing__together-file-icon">
                                  <FileText :size="14" :stroke-width="2.25" aria-hidden="true" />
                                </span>
                                <span class="landing__together-file-copy">
                                  <span class="landing__together-file-name">Tickets.pdf</span>
                                  <span class="landing__together-file-meta">PDF · 240 KB</span>
                                </span>
                              </span>
                              <span class="landing__together-file">
                                <span class="landing__together-file-icon landing__together-file-icon--image">
                                  <img
                                    :src="previewHero"
                                    alt=""
                                    width="64"
                                    height="64"
                                  />
                                </span>
                                <span class="landing__together-file-copy">
                                  <span class="landing__together-file-name">Booking.jpg</span>
                                  <span class="landing__together-file-meta">Image</span>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="landing__together-float">
                        <span class="landing__together-float-icon">
                          <FileText :size="14" :stroke-width="2.25" aria-hidden="true" />
                        </span>
                        <span>
                          <strong>Boarding pass</strong>
                          Ready on this stop
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    v-else-if="feature.id === 'share'"
                    class="landing__preview landing__preview--share"
                  >
                    <div class="landing__preview-glow landing__preview-glow--warm" />
                    <div class="landing__share">
                      <div class="landing__share-sheet">
                        <header class="landing__share-head">
                          <p class="landing__share-eyebrow">
                            <Share2 :size="13" :stroke-width="2.25" aria-hidden="true" />
                            Share
                          </p>
                          <h4 class="landing__share-title">Japan 2026</h4>
                          <p class="landing__share-sub">21 – 31 July · three of us</p>
                        </header>

                        <div class="landing__share-cover">
                          <img
                            :src="previewHero"
                            alt=""
                            width="800"
                            height="420"
                          />
                          <div class="landing__share-cover-veil" />
                          <div class="landing__share-cover-meta">
                            <span>11 days</span>
                            <span aria-hidden="true">·</span>
                            <span>4 cities</span>
                          </div>
                        </div>

                        <div class="landing__share-access">
                          <div class="landing__share-faces" aria-hidden="true">
                            <span class="landing__share-face">J</span>
                            <span class="landing__share-face">K</span>
                            <span class="landing__share-face landing__share-face--plus">+</span>
                          </div>
                          <div>
                            <p class="landing__share-access-label">Anyone with the link</p>
                            <p class="landing__share-access-hint">Can view · no account needed</p>
                          </div>
                        </div>

                        <div class="landing__share-link">
                          <Link2 :size="14" :stroke-width="2.25" aria-hidden="true" />
                          <span class="landing__share-url">daymark.app/t/japan-2026</span>
                          <span class="landing__share-copy">Copy</span>
                        </div>
                      </div>

                      <div class="landing__share-toast">
                        <Check :size="14" :stroke-width="2.5" aria-hidden="true" />
                        Link copied — send it to anyone
                      </div>
                    </div>
                  </div>

                  <div
                    v-else
                    class="landing__preview landing__preview--memory"
                  >
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

          <div class="landing__carousel-controls">
            <button
              type="button"
              class="landing__carousel-nav"
              aria-label="Previous feature"
              @click="prevFeature"
            >
              <ArrowLeft :size="18" :stroke-width="2.25" aria-hidden="true" />
            </button>

            <div class="landing__carousel-dots" aria-hidden="true">
              <span
                v-for="(feature, index) in features"
                :key="feature.id"
                class="landing__carousel-dot"
                :class="{ 'landing__carousel-dot--active': featureIndex === index }"
              />
            </div>

            <button
              type="button"
              class="landing__carousel-nav"
              :aria-label="`Next feature: ${features[(featureIndex + 1) % features.length].name}`"
              @click="nextFeature"
            >
              <ArrowRight :size="18" :stroke-width="2.25" aria-hidden="true" />
            </button>
          </div>

          <p class="visually-hidden" aria-live="polite">
            Showing {{ activeFeature.name }}
          </p>
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

    <section class="landing__faq" id="faq">
      <div class="landing__faq-inner">
        <header class="landing__faq-header">
          <h2 class="landing__faq-title">FAQs</h2>
          <p class="landing__faq-lede">
            A few things people usually want to know.
          </p>
        </header>

        <div class="landing__faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="faq.question"
            class="landing__faq-item"
            :class="{ 'landing__faq-item--open': openFaq === index }"
          >
            <h3 class="landing__faq-question">
              <button
                type="button"
                class="landing__faq-trigger"
                :aria-expanded="openFaq === index"
                :aria-controls="`faq-panel-${index}`"
                :id="`faq-trigger-${index}`"
                @click="toggleFaq(index)"
              >
                <span>{{ faq.question }}</span>
                <ChevronDown
                  class="landing__faq-chevron"
                  :size="18"
                  :stroke-width="2.25"
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              :id="`faq-panel-${index}`"
              class="landing__faq-panel"
              role="region"
              :aria-labelledby="`faq-trigger-${index}`"
              :hidden="openFaq !== index"
            >
              <p
                v-for="(paragraph, paragraphIndex) in faq.answer"
                :key="paragraphIndex"
                class="landing__faq-answer"
              >
                {{ paragraph }}
              </p>
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
