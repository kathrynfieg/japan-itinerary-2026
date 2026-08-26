<script setup lang="ts">
import { Plus, Settings, UserRound } from '@lucide/vue'
import type { TripRecord } from '../lib/createTrip'

defineProps<{
  trips: TripRecord[]
}>()

const emit = defineEmits<{
  create: []
  open: [id: string]
}>()

function dayCount(record: TripRecord) {
  return record.days.length
}

function travelersLabel(record: TripRecord) {
  const list = record.trip.travelers
  if (!list.length) return null
  return list.join(' · ')
}
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
        <li v-for="record in trips" :key="record.id">
          <button
            type="button"
            class="dash-card"
            @click="emit('open', record.id)"
          >
            <div
              class="dash-card__media"
              :style="{ '--card-image': `url(${record.trip.heroImage})` }"
              role="img"
              :aria-label="record.trip.heroAlt"
            />
            <div class="dash-card__body">
              <div class="dash-card__title-row">
                <h2 class="dash-card__name">{{ record.trip.name }}</h2>
                <span v-if="record.trip.isDemo" class="dash-card__badge"
                  >Demo</span
                >
              </div>
              <p class="dash-card__dates">{{ record.trip.rangeLabel }}</p>
              <p class="dash-card__meta">
                {{ dayCount(record) }}
                day{{ dayCount(record) === 1 ? '' : 's' }}
                <template v-if="travelersLabel(record)">
                  <span class="dash-card__sep">·</span>
                  {{ travelersLabel(record) }}
                </template>
              </p>
            </div>
          </button>
        </li>

        <li>
          <button
            type="button"
            class="dash-card dash-card--new"
            @click="emit('create')"
          >
            <span class="dash-card__new-icon" aria-hidden="true">
              <Plus :size="22" :stroke-width="2" />
            </span>
            <span class="dash-card__new-label">Create a trip</span>
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
