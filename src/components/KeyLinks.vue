<script setup lang="ts">
import { ExternalLink } from '@lucide/vue'
import type { TripLink } from '../data/trip'

defineProps<{
  links: TripLink[]
}>()
</script>

<template>
  <section
    v-if="links.length"
    id="links"
    class="links"
    aria-labelledby="links-heading"
  >
    <header class="links__header">
      <h2 id="links-heading" class="links__heading">Key links</h2>
      <p class="links__sub">
        Pinned from your itinerary — tickets, bookings, and attachments in one
        place.
      </p>
    </header>

    <ul class="links__list">
      <li
        v-for="item in links"
        :key="item.href + item.label"
        class="links__item"
      >
        <a
          class="links__anchor"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="links__label">{{ item.label }}</span>
          <ExternalLink
            class="links__icon"
            :size="14"
            :stroke-width="2"
            aria-hidden="true"
          />
        </a>
        <p v-if="item.note" class="links__note">{{ item.note }}</p>
      </li>
    </ul>
  </section>
</template>
