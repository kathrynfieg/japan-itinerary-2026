<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Check, Copy, Link2, Lock, Printer, Share2, X } from '@lucide/vue'
import {
  TRIP_PRIVACY,
  type SessionTrip,
  type TripPrivacy,
} from '../lib/createTrip'

const props = defineProps<{
  open: boolean
  trip: SessionTrip
  tripId: string
}>()

const emit = defineEmits<{
  close: []
  update: [privacy: TripPrivacy]
}>()

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

const privacy = computed(() => props.trip.privacy ?? 'private')
const canShareLink = computed(() => privacy.value === 'link')

const shareUrl = computed(
  () => `https://piper.travel/t/${props.tripId}?view=1`,
)

async function copyLink() {
  if (!canShareLink.value) return

  try {
    await navigator.clipboard.writeText(shareUrl.value)
  } catch {
    const area = document.createElement('textarea')
    area.value = shareUrl.value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }

  copied.value = true
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 1800)
}

function printTrip() {
  emit('close')
  requestAnimationFrame(() => {
    window.setTimeout(() => window.print(), 120)
  })
}

function setPrivacy(next: TripPrivacy) {
  emit('update', next)
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') emit('close')
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (copiedTimer) clearTimeout(copiedTimer)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="share"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
    >
      <button
        type="button"
        class="share__backdrop"
        aria-label="Close share"
        @click="emit('close')"
      />

      <div class="share__sheet">
        <header class="share__header">
          <div>
            <p class="share__eyebrow">
              <Share2 :size="13" :stroke-width="2.25" aria-hidden="true" />
              Share
            </p>
            <h2 id="share-title" class="share__title">{{ trip.name }}</h2>
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
          Choose who can view, then copy a link or export. You’re still the
          only one who can edit.
        </p>

        <div
          class="share__privacy"
          role="radiogroup"
          aria-label="Who can view this trip"
        >
          <button
            type="button"
            role="radio"
            class="share__privacy-opt"
            :class="{ 'share__privacy-opt--on': privacy === 'private' }"
            :aria-checked="privacy === 'private'"
            @click="setPrivacy('private')"
          >
            <Lock :size="15" :stroke-width="2" aria-hidden="true" />
            <span class="share__privacy-copy">
              <span class="share__privacy-label">{{
                TRIP_PRIVACY.private.label
              }}</span>
              <span class="share__privacy-sub">{{
                TRIP_PRIVACY.private.blurb
              }}</span>
            </span>
          </button>
          <button
            type="button"
            role="radio"
            class="share__privacy-opt"
            :class="{ 'share__privacy-opt--on': privacy === 'link' }"
            :aria-checked="privacy === 'link'"
            @click="setPrivacy('link')"
          >
            <Link2 :size="15" :stroke-width="2" aria-hidden="true" />
            <span class="share__privacy-copy">
              <span class="share__privacy-label">{{
                TRIP_PRIVACY.link.label
              }}</span>
              <span class="share__privacy-sub">{{
                TRIP_PRIVACY.link.blurb
              }}</span>
            </span>
          </button>
        </div>

        <div v-if="canShareLink" class="share__block">
          <span class="share__label">View link</span>
          <div class="share__link-row">
            <input
              class="share__link-input"
              type="text"
              readonly
              :value="shareUrl"
              aria-label="View-only share link"
              @focus="($event.target as HTMLInputElement).select()"
            />
            <button type="button" class="share__copy" @click="copyLink">
              <Check
                v-if="copied"
                :size="16"
                :stroke-width="2.25"
                aria-hidden="true"
              />
              <Copy
                v-else
                :size="16"
                :stroke-width="2.25"
                aria-hidden="true"
              />
              {{ copied ? 'Copied' : 'Copy' }}
            </button>
          </div>
        </div>
        <p v-else class="share__note share__note--private">
          This trip is private — switch to “Anyone with the link” above to
          share a view link.
        </p>

        <div class="share__actions">
          <button type="button" class="share__action" @click="printTrip">
            <span class="share__action-icon" aria-hidden="true">
              <Printer :size="18" :stroke-width="2" />
            </span>
            <span class="share__action-copy">
              <span class="share__action-title">Print / PDF</span>
              <span class="share__action-sub">
                Use your browser’s Save as PDF
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
