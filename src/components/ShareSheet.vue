<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  Check,
  Copy,
  FileText,
  Link2,
  Printer,
  Share2,
  X,
} from '@lucide/vue'
import type { Day, TripLink } from '../data/trip'
import type { SessionTrip } from '../lib/createTrip'

const props = defineProps<{
  open: boolean
  trip: SessionTrip
  days: Day[]
  links: TripLink[]
  tripId: string
}>()

const emit = defineEmits<{
  close: []
}>()

const copied = ref<'link' | 'text' | null>(null)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

const shareUrl = computed(
  () => `https://piper.travel/t/${props.tripId}?view=1`,
)

const summaryText = computed(() => {
  const lines: string[] = []
  lines.push(`${props.trip.name} · ${props.trip.rangeLabel}`)
  if (props.trip.travelers.length) {
    lines.push(props.trip.travelers.join(' · '))
  }
  if (props.trip.tagline) lines.push(props.trip.tagline)
  lines.push('')

  for (const day of props.days) {
    const date = new Date(day.date + 'T12:00:00').toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
    lines.push(`${day.title} — ${date}`)
    if (day.summary) lines.push(day.summary)

    if (!day.activities.length) {
      lines.push('  (nothing planned yet)')
    } else {
      for (const activity of day.activities) {
        const time = activity.time ? `${activity.time} · ` : ''
        const place = activity.place ? ` @ ${activity.place}` : ''
        lines.push(`  • ${time}${activity.title}${place}`)
        if (activity.link) lines.push(`    ${activity.link}`)
        if (activity.maps) lines.push(`    Maps: ${activity.maps}`)
        if (activity.notes?.length) {
          for (const note of activity.notes) lines.push(`    - ${note}`)
        }
      }
    }
    lines.push('')
  }

  if (props.links.length) {
    lines.push('Key links')
    for (const link of props.links) {
      const note = link.note ? ` (${link.note})` : ''
      lines.push(`  • ${link.label}${note}`)
      lines.push(`    ${link.href}`)
    }
  }

  lines.push('')
  lines.push('Shared from Piper Travel (mock)')
  return lines.join('\n')
})

async function copyValue(kind: 'link' | 'text', value: string) {
  try {
    await navigator.clipboard.writeText(value)
  } catch {
    // Fallback for older browsers / denied permission
    const area = document.createElement('textarea')
    area.value = value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.left = '-9999px'
    document.body.appendChild(area)
    area.select()
    document.execCommand('copy')
    document.body.removeChild(area)
  }

  copied.value = kind
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => {
    copied.value = null
  }, 1800)
}

function copyLink() {
  void copyValue('link', shareUrl.value)
}

function copyText() {
  void copyValue('text', summaryText.value)
}

function printTrip() {
  emit('close')
  // Let the sheet close before the print dialog opens
  requestAnimationFrame(() => {
    window.setTimeout(() => window.print(), 120)
  })
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
              Share · mock
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
          View-only for others. You’re still the only one who can edit.
        </p>

        <div class="share__block">
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
                v-if="copied === 'link'"
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
              {{ copied === 'link' ? 'Copied' : 'Copy' }}
            </button>
          </div>
          <p class="share__note">
            Fake URL for the mock — nothing is hosted yet.
          </p>
        </div>

        <div class="share__actions">
          <button type="button" class="share__action" @click="copyText">
            <span class="share__action-icon" aria-hidden="true">
              <Check
                v-if="copied === 'text'"
                :size="18"
                :stroke-width="2"
              />
              <FileText v-else :size="18" :stroke-width="2" />
            </span>
            <span class="share__action-copy">
              <span class="share__action-title">
                {{ copied === 'text' ? 'Copied summary' : 'Copy text' }}
              </span>
              <span class="share__action-sub">
                Days, stops, and key links as plain text
              </span>
            </span>
          </button>

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

          <div class="share__action share__action--static">
            <span class="share__action-icon" aria-hidden="true">
              <Link2 :size="18" :stroke-width="2" />
            </span>
            <span class="share__action-copy">
              <span class="share__action-title">Live share link</span>
              <span class="share__action-sub">
                Coming later when trips are saved online
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
