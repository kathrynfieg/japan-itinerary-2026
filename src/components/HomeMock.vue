<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  Copy,
  Link2,
  Lock,
  MoreHorizontal,
  Pencil,
  Plus,
  Settings,
  Share2,
  Trash2,
  UserRound,
} from '@lucide/vue'
import { TRIP_PRIVACY, type TripRecord } from '../lib/createTrip'

defineProps<{
  trips: TripRecord[]
}>()

const emit = defineEmits<{
  create: []
  open: [id: string]
  edit: [id: string]
  share: [id: string]
  privacy: [id: string]
  duplicate: [id: string]
  remove: [id: string]
}>()

const menuId = ref<string | null>(null)

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
  action: 'edit' | 'share' | 'privacy' | 'duplicate' | 'remove',
  id: string,
) {
  event.stopPropagation()
  menuId.value = null
  emit(action, id)
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
      <div class="dash__brand-wrap">
        <p class="dash__brand">Piper Travel</p>
        <p class="dash__brand-sub">Mock · session only</p>
      </div>
      <div class="dash__top-actions">
        <button type="button" class="dash__icon-btn" aria-label="Settings">
          <Settings :size="18" :stroke-width="2" aria-hidden="true" />
        </button>
        <button type="button" class="dash__account" aria-label="Account">
          <span class="dash__avatar" aria-hidden="true">
            <UserRound :size="16" :stroke-width="2" />
          </span>
          <span class="dash__account-text">
            <span class="dash__account-name">You</span>
            <span class="dash__account-meta">Owner</span>
          </span>
        </button>
      </div>
    </header>

    <main class="dash__main">
      <header class="dash__header">
        <div>
          <h1 class="dash__title">Your trips</h1>
          <p class="dash__lede">
            Open a trip to view the timeline, or start a new one.
          </p>
        </div>
        <button type="button" class="dash__create" @click="emit('create')">
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
                <span
                  v-if="record.trip.isDemo"
                  class="dash-card__badge"
                  >Demo</span
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
                  @click="runAction($event, 'privacy', record.id)"
                >
                  <Lock :size="15" :stroke-width="2" aria-hidden="true" />
                  Privacy
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

        <li class="dash__cell" :style="{ '--i': trips.length }">
          <button
            type="button"
            class="dash-card dash-card--new"
            @click="emit('create')"
          >
            <span class="dash-card__new-icon" aria-hidden="true">
              <Plus :size="22" :stroke-width="2" />
            </span>
            <span class="dash-card__new-label">Create a trip</span>
            <span class="dash-card__new-hint">Pick dates and go</span>
          </button>
        </li>
      </ul>

      <div v-else class="dash__empty">
        <p class="dash__empty-title">No trips yet</p>
        <p class="dash__empty-copy">
          Create one and we’ll set up Day 1 through Day N for you.
        </p>
        <button type="button" class="dash__create" @click="emit('create')">
          <Plus :size="16" :stroke-width="2.25" aria-hidden="true" />
          New trip
        </button>
      </div>
    </main>
  </div>
</template>
