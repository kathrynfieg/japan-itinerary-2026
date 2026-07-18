<script setup lang="ts">
import type { Day } from '../data/trip'

defineProps<{
  day: Day
  index: number
}>()

function dayNumber(date: string) {
  return new Date(date + 'T12:00:00').getDate()
}

function monthLabel(date: string) {
  return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    month: 'short',
  })
}
</script>

<template>
  <article :id="day.id" class="day" :style="{ '--i': index }">
    <div class="day__rail" aria-hidden="true">
      <span class="day__dot" />
    </div>

    <div class="day__body">
      <header class="day__header">
        <p class="day__date">
          <span class="day__num">{{ dayNumber(day.date) }}</span>
          <span class="day__meta">
            {{ monthLabel(day.date) }}
            <span class="day__sep">·</span>
            {{ day.weekday }}
          </span>
        </p>
        <h3 class="day__title">{{ day.title }}</h3>
        <p class="day__summary">{{ day.summary }}</p>
      </header>

      <ul v-if="day.activities.length" class="day__list">
        <li
          v-for="(activity, i) in day.activities"
          :key="`${day.id}-${i}`"
          class="day__item"
          :class="{ 'day__item--timed': activity.time }"
        >
          <time v-if="activity.time" class="day__time">{{ activity.time }}</time>
          <div class="day__info">
            <a
              v-if="activity.link"
              class="day__activity-title day__activity-title--link"
              :href="activity.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ activity.title }}
            </a>
            <p v-else class="day__activity-title">{{ activity.title }}</p>
            <p v-if="activity.place" class="day__place">{{ activity.place }}</p>
            <ul
              v-if="activity.notes?.length"
              class="day__notes"
            >
              <li
                v-for="(note, noteIndex) in activity.notes"
                :key="noteIndex"
                class="day__note"
              >
                {{ note }}
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <p v-else class="day__empty">No stops listed yet.</p>
    </div>
  </article>
</template>
