<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  Copy,
  Link2,
  Lock,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Share2,
  Smartphone,
  Trash2,
} from '@lucide/vue'
import { TRIP_PRIVACY, type TripRecord } from '../lib/createTrip'
import { dashResources } from '../data/dashResources'
import logo from '../assets/3.png'

defineProps<{
  trips: TripRecord[]
}>()

const emit = defineEmits<{
  create: []
  open: [id: string]
  edit: [id: string]
  share: [id: string]
  duplicate: [id: string]
  remove: [id: string]
}>()

const menuId = ref<string | null>(null)

const exampleResources = computed(() =>
  dashResources.filter((resource) => resource.kind === 'example'),
)

const guideResources = computed(() =>
  dashResources.filter((resource) => resource.kind === 'guide'),
)

function dayCount(record: TripRecord) {
  return record.days.length
}

function travelersLabel(record: TripRecord) {
  const list = record.trip.travelers
  if (!list.length) return null
  return list.join(' · ')
}

function privacyLabel(record: TripRecord) {
  return TRIP_PRIVACY[record.trip.privacy ?? 'private'].label
}

function isPrivate(record: TripRecord) {
  return (record.trip.privacy ?? 'private') === 'private'
}

function toggleMenu(id: string, event: Event) {
  event.stopPropagation()
  menuId.value = menuId.value === id ? null : id
}

function runAction(
  event: Event,
  action: 'edit' | 'share' | 'duplicate' | 'remove',
  id: string,
) {
  event.stopPropagation()
  menuId.value = null
  switch (action) {
    case 'edit':
      emit('edit', id)
      break
    case 'share':
      emit('share', id)
      break
    case 'duplicate':
      emit('duplicate', id)
      break
    case 'remove':
      emit('remove', id)
      break
  }
}

function onDocumentPointerDown(event: PointerEvent) {
  const target = event.target as HTMLElement | null
  if (!target?.closest('.dash-card__menu')) menuId.value = null
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') menuId.value = null
}

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="dash">
    <header class="dash__top">
      <div class="dash__brand">
        <img class="dash__mark" :src="logo" alt="" width="46" height="46" />
        <span>Daymark</span>
      </div>
      <div class="dash__top-actions">
        <button type="button" class="dash__icon-btn" aria-label="Settings">
          <Settings :size="18" :stroke-width="2" aria-hidden="true" />
        </button>
        <button type="button" class="dash__account" aria-label="Account">
          <span class="dash__avatar" aria-hidden="true">K</span>
        </button>
      </div>
    </header>

    <main class="dash__main">
      <header class="dash__header">
        <div class="dash__header-copy">
          <h1 class="dash__title">Your trips</h1>
          <p class="dash__lede">
            {{
              trips.length
                ? 'Open a trip to view the timeline, or start a new one.'
                : 'A simple place to plan your days.'
            }}
          </p>
        </div>
        <button
          v-if="trips.length"
          type="button"
          class="dash__create"
          @click="emit('create')"
        >
          <Plus :size="16" :stroke-width="2.25" aria-hidden="true" />
          New trip
        </button>
      </header>

      <ul v-if="trips.length" class="dash__grid">
        <li
          v-for="(record, index) in trips"
          :key="record.id"
          class="dash__cell"
          :style="{ '--i': index }"
        >
          <article class="dash-card">
            <button
              type="button"
              class="dash-card__open"
              @click="emit('open', record.id)"
            >
              <div
                class="dash-card__media"
                :style="{ '--card-image': `url(${record.trip.heroImage})` }"
                role="img"
                :aria-label="record.trip.heroAlt"
              >
                <span class="dash-card__year" aria-hidden="true">{{
                  record.trip.year
                }}</span>
                <div class="dash-card__caption">
                  <h2 class="dash-card__name">{{ record.trip.name }}</h2>
                  <p class="dash-card__dates">{{ record.trip.rangeLabel }}</p>
                </div>
              </div>
              <div class="dash-card__foot">
                <p class="dash-card__meta">
                  <span class="dash-card__days"
                    >{{ dayCount(record) }}
                    day{{ dayCount(record) === 1 ? '' : 's' }}</span
                  >
                  <template v-if="travelersLabel(record)">
                    <span class="dash-card__sep" aria-hidden="true">·</span>
                    <span class="dash-card__who">{{
                      travelersLabel(record)
                    }}</span>
                  </template>
                </p>
                <p class="dash-card__privacy">
                  <Lock
                    v-if="isPrivate(record)"
                    :size="12"
                    :stroke-width="2.25"
                    aria-hidden="true"
                  />
                  <Link2
                    v-else
                    :size="12"
                    :stroke-width="2.25"
                    aria-hidden="true"
                  />
                  {{ privacyLabel(record) }}
                </p>
              </div>
            </button>

            <div class="dash-card__menu">
              <button
                type="button"
                class="dash-card__menu-btn"
                :aria-expanded="menuId === record.id"
                aria-haspopup="menu"
                :aria-label="`Actions for ${record.trip.name}`"
                @click="toggleMenu(record.id, $event)"
              >
                <MoreHorizontal
                  :size="18"
                  :stroke-width="2"
                  aria-hidden="true"
                />
              </button>

              <div
                v-if="menuId === record.id"
                class="dash-card__menu-panel"
                role="menu"
                :aria-label="`${record.trip.name} actions`"
              >
                <button
                  type="button"
                  role="menuitem"
                  class="dash-card__menu-item"
                  @click="runAction($event, 'edit', record.id)"
                >
                  <Pencil :size="15" :stroke-width="2" aria-hidden="true" />
                  Edit
                </button>
                <button
                  type="button"
                  role="menuitem"
                  class="dash-card__menu-item"
                  @click="runAction($event, 'share', record.id)"
                >
                  <Share2 :size="15" :stroke-width="2" aria-hidden="true" />
                  Share
                </button>
                <button
                  type="button"
                  role="menuitem"
                  class="dash-card__menu-item"
                  @click="runAction($event, 'duplicate', record.id)"
                >
                  <Copy :size="15" :stroke-width="2" aria-hidden="true" />
                  Duplicate
                </button>
                <button
                  type="button"
                  role="menuitem"
                  class="dash-card__menu-item dash-card__menu-item--danger"
                  @click="runAction($event, 'remove', record.id)"
                >
                  <Trash2 :size="15" :stroke-width="2" aria-hidden="true" />
                  Delete
                </button>
              </div>
            </div>
          </article>
        </li>

        <li class="dash__cell dash__cell--new" :style="{ '--i': trips.length }">
          <button
            type="button"
            class="dash-card dash-card--new"
            @click="emit('create')"
          >
            <span class="dash-card__new-frame" aria-hidden="true">
              <span class="dash-card__new-corner dash-card__new-corner--tl"></span>
              <span class="dash-card__new-corner dash-card__new-corner--tr"></span>
              <span class="dash-card__new-corner dash-card__new-corner--bl"></span>
              <span class="dash-card__new-corner dash-card__new-corner--br"></span>
            </span>
            <span class="dash-card__new-plus" aria-hidden="true">
              <Plus :size="26" :stroke-width="2" />
            </span>
            <span class="dash-card__new-copy">
              <span class="dash-card__new-label">Create a trip</span>
              <span class="dash-card__new-hint"
                >Blank plan · add dates anytime</span
              >
            </span>
          </button>
        </li>
      </ul>

      <div v-else class="dash__empty">
        <button type="button" class="dash-empty" @click="emit('create')">
          <span class="dash-empty__frame" aria-hidden="true">
            <span class="dash-empty__corner dash-empty__corner--tl"></span>
            <span class="dash-empty__corner dash-empty__corner--tr"></span>
            <span class="dash-empty__corner dash-empty__corner--bl"></span>
            <span class="dash-empty__corner dash-empty__corner--br"></span>
          </span>
          <span class="dash-empty__plus" aria-hidden="true">
            <Plus :size="24" :stroke-width="2" />
          </span>
          <span class="dash-empty__copy">
            <span class="dash-empty__title">Create your first trip</span>
            <span class="dash-empty__text">
              Add your dates and we’ll lay out each day. Fill in plans, links
              and notes whenever you’re ready.
            </span>
          </span>
        </button>
      </div>

      <section class="dash__resources" aria-label="Resources">
        <div class="dash__resources-block">
          <div class="dash__resources-intro">
            <h2 class="dash__resources-label">Explore examples</h2>
            <p class="dash__resources-lede">
              Need some inspiration? See how Daymark can work for different
              kinds of trips.
            </p>
          </div>
          <div class="dash__resources-track">
            <article
              v-for="resource in exampleResources"
              :key="resource.id"
              class="dash-sample"
            >
              <button type="button" class="dash-sample__btn">
                <div
                  class="dash-sample__media"
                  :style="{ '--card-image': `url(${resource.image})` }"
                  role="img"
                  :aria-label="resource.imageAlt"
                >
                  <div class="dash-sample__caption">
                    <h3 class="dash-sample__title">{{ resource.title }}</h3>
                    <p class="dash-sample__meta">{{ resource.meta }}</p>
                  </div>
                </div>
              </button>
            </article>
          </div>
        </div>

        <div class="dash__resources-block">
          <h2 class="dash__resources-label dash__resources-label--solo">
            Quick tips
          </h2>
          <div class="dash__resources-track dash__resources-track--tips">
            <article
              v-for="resource in guideResources"
              :key="resource.id"
              class="dash-tip"
            >
              <button type="button" class="dash-tip__btn">
                <span class="dash-tip__title">{{ resource.title }}</span>
                <span class="dash-tip__text">{{ resource.description }}</span>
              </button>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer class="dash__footer">
      <div class="dash__footer-inner">
        <div class="dash__footer-top">
          <div class="dash__footer-brand-block">
            <div class="dash__footer-brand">
              <img
                class="dash__footer-mark"
                :src="logo"
                alt=""
                width="30"
                height="30"
              />
              <span>Daymark</span>
            </div>
            <p class="dash__footer-tagline">Plan · travel · remember</p>
          </div>

          <nav class="dash__footer-nav" aria-label="Footer">
            <div class="dash__footer-col">
              <p class="dash__footer-col-label">Product</p>
              <ul class="dash__footer-links">
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>
            <div class="dash__footer-col">
              <p class="dash__footer-col-label">Support</p>
              <ul class="dash__footer-links">
                <li><a href="#">Help centre</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div class="dash__footer-col">
              <p class="dash__footer-col-label">Legal</p>
              <ul class="dash__footer-links">
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Cookies</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="dash__footer-bottom">
          <p class="dash__footer-copy">© 2026 Daymark. All rights reserved.</p>
          <button type="button" class="dash__footer-save">
            <Smartphone :size="14" :stroke-width="2" aria-hidden="true" />
            Save to home screen
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>
