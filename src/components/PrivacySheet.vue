<script setup lang="ts">
import { Lock, Link2, X } from '@lucide/vue'
import {
  TRIP_PRIVACY,
  type SessionTrip,
  type TripPrivacy,
} from '../lib/createTrip'

defineProps<{
  open: boolean
  trip: SessionTrip
}>()

const emit = defineEmits<{
  close: []
  update: [privacy: TripPrivacy]
}>()

function privacyOf(trip: SessionTrip): TripPrivacy {
  return trip.privacy ?? 'private'
}
</script>

<template>
  <div
    v-if="open"
    class="share"
    role="dialog"
    aria-modal="true"
    aria-labelledby="privacy-title"
  >
    <button
      type="button"
      class="share__backdrop"
      aria-label="Close privacy"
      @click="emit('close')"
    />

    <div class="share__sheet">
      <header class="share__header">
        <div>
          <p class="share__eyebrow">
            <Lock :size="13" :stroke-width="2.25" aria-hidden="true" />
            Privacy · mock
          </p>
          <h2 id="privacy-title" class="share__title">{{ trip.name }}</h2>
        </div>
        <button
          type="button"
          class="share__close"
          aria-label="Close"
          @click="emit('close')"
        >
          <X :size="18" :stroke-width="2" />
        </button>
      </header>

      <p class="share__lede">
        Choose who can open this trip. You’re still the only one who can edit.
      </p>

      <div
        class="share__actions"
        role="radiogroup"
        aria-label="Trip privacy"
      >
        <button
          type="button"
          role="radio"
          class="share__action"
          :class="{ 'share__action--on': privacyOf(trip) === 'private' }"
          :aria-checked="privacyOf(trip) === 'private'"
          @click="emit('update', 'private')"
        >
          <span class="share__action-icon" aria-hidden="true">
            <Lock :size="18" :stroke-width="2" />
          </span>
          <span class="share__action-copy">
            <span class="share__action-title">{{
              TRIP_PRIVACY.private.label
            }}</span>
            <span class="share__action-sub">{{
              TRIP_PRIVACY.private.blurb
            }}</span>
          </span>
        </button>

        <button
          type="button"
          role="radio"
          class="share__action"
          :class="{ 'share__action--on': privacyOf(trip) === 'link' }"
          :aria-checked="privacyOf(trip) === 'link'"
          @click="emit('update', 'link')"
        >
          <span class="share__action-icon" aria-hidden="true">
            <Link2 :size="18" :stroke-width="2" />
          </span>
          <span class="share__action-copy">
            <span class="share__action-title">{{
              TRIP_PRIVACY.link.label
            }}</span>
            <span class="share__action-sub">{{
              TRIP_PRIVACY.link.blurb
            }}</span>
          </span>
        </button>
      </div>

      <p class="share__note share__note--foot">
        Mock only — the link doesn’t publish anything yet. Use Share when you
        want the fake view URL.
      </p>
    </div>
  </div>
</template>
