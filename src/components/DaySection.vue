<script setup lang="ts">
import { Cake, FileText, MapPin, PartyPopper } from '@lucide/vue'
import { activityTypes, type Day } from '../data/trip'

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
  <article
    :id="day.id"
    class="day"
    :class="{ 'day--birthday': day.theme === 'birthday' }"
    :style="{ '--i': index }"
  >
    <p class="day__date">
      <span class="day__num">{{ dayNumber(day.date) }}</span>
      <span class="day__meta">
        {{ monthLabel(day.date) }}
        <span class="day__sep">·</span>
        {{ day.weekday }}
      </span>
      <span
        v-if="day.theme === 'birthday'"
        class="day__birthday-mark"
        aria-label="Zac’s 30th birthday"
      >
        <PartyPopper :size="14" :stroke-width="2.25" aria-hidden="true" />
        <span>Zac’s 30th</span>
      </span>
    </p>

    <header class="day__header">
      <div class="day__heading-row">
        <h3 class="day__title">{{ day.title }}</h3>
        <Cake
          v-if="day.theme === 'birthday'"
          class="day__cake"
          :size="16"
          :stroke-width="2"
          aria-hidden="true"
        />
      </div>
      <p class="day__summary">{{ day.summary }}</p>
    </header>

    <ul v-if="day.activities.length" class="day__list">
      <li
        v-for="(activity, i) in day.activities"
        :key="`${day.id}-${i}`"
        class="day__item"
        :class="{ 'day__item--untimed': !activity.time }"
      >
        <div class="day__track" aria-hidden="true">
          <span
            class="day__dot"
            :class="{ 'day__dot--quiet': !activity.time }"
          />
        </div>

        <time v-if="activity.time" class="day__time">{{ activity.time }}</time>
        <span v-else class="day__time day__time--empty" aria-hidden="true"
          >—</span
        >

        <div class="day__info">
          <div class="day__title-row">
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
            <span
              v-if="activity.type"
              class="day__chip"
              :data-type="activity.type"
            >
              <span aria-hidden="true">{{
                activityTypes[activity.type].emoji
              }}</span>
              {{ activityTypes[activity.type].label }}
            </span>
          </div>
          <a
            v-if="activity.place && activity.maps"
            class="day__place day__place--link"
            :href="activity.maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin
              class="day__place-icon"
              :size="13"
              :stroke-width="2"
              aria-hidden="true"
            />
            <span>{{ activity.place }}</span>
          </a>
          <p v-else-if="activity.place" class="day__place">
            <MapPin
              class="day__place-icon"
              :size="13"
              :stroke-width="2"
              aria-hidden="true"
            />
            <span>{{ activity.place }}</span>
          </p>
          <ul v-if="activity.notes?.length" class="day__notes">
            <li
              v-for="(note, noteIndex) in activity.notes"
              :key="noteIndex"
              class="day__note"
            >
              {{ note }}
            </li>
          </ul>
          <ul
            v-if="activity.links?.length"
            class="day__links"
            aria-label="Links"
          >
            <li v-for="item in activity.links" :key="`${item.label}-${item.href}`">
              <a
                class="day__link"
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
          <ul
            v-if="activity.files?.length"
            class="day__files"
            aria-label="Attachments"
          >
            <li v-for="file in activity.files" :key="file.name">
              <a
                class="day__file"
                :class="{ 'day__file--image': file.kind === 'image' }"
                :href="file.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="day__file-thumb" aria-hidden="true">
                  <img
                    v-if="file.kind === 'image' && (file.thumb || file.url)"
                    :src="file.thumb || file.url"
                    alt=""
                  />
                  <FileText
                    v-else
                    :size="14"
                    :stroke-width="2.25"
                  />
                </span>
                <span class="day__file-name">{{ file.name }}</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <p v-else class="day__empty">No stops listed yet.</p>
  </article>
</template>
