<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
  X,
} from '@lucide/vue'
import {
  activityTypes,
  days as sourceDays,
  trip,
  type Activity,
  type ActivityType,
  type Day,
} from '../data/trip'

type EditableActivity = Activity & { _id: string }

type EditableDay = Omit<Day, 'activities'> & {
  activities: EditableActivity[]
}

const emit = defineEmits<{
  done: []
}>()

let idCounter = 0
function nextId() {
  idCounter += 1
  return `a-${idCounter}`
}

function cloneDays(): EditableDay[] {
  return sourceDays.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      notes: activity.notes ? [...activity.notes] : undefined,
      _id: nextId(),
    })),
  }))
}

const editDays = ref<EditableDay[]>(cloneDays())
const selectedDayId = ref(editDays.value[1]?.id ?? editDays.value[0]?.id ?? '')
const expandedId = ref<string | null>(null)
const quickTitle = ref('')
const moveTarget = ref('')

const selectedDay = computed(
  () => editDays.value.find((d) => d.id === selectedDayId.value) ?? null,
)

const typeOptions = Object.entries(activityTypes) as [
  ActivityType,
  (typeof activityTypes)[ActivityType],
][]

function dayNumber(date: string) {
  return new Date(date + 'T12:00:00').getDate()
}

function selectDay(id: string) {
  selectedDayId.value = id
  expandedId.value = null
  quickTitle.value = ''
  moveTarget.value = ''
}

function toggleExpand(id: string) {
  expandedId.value = expandedId.value === id ? null : id
  moveTarget.value = ''
}

function addActivity() {
  const title = quickTitle.value.trim()
  if (!title || !selectedDay.value) return

  const activity: EditableActivity = {
    _id: nextId(),
    title,
  }
  selectedDay.value.activities.push(activity)
  quickTitle.value = ''
  expandedId.value = activity._id
}

function removeActivity(id: string) {
  if (!selectedDay.value) return
  selectedDay.value.activities = selectedDay.value.activities.filter(
    (a) => a._id !== id,
  )
  if (expandedId.value === id) expandedDayClear()
}

function expandedDayClear() {
  expandedId.value = null
  moveTarget.value = ''
}

function moveActivity(id: string, direction: -1 | 1) {
  if (!selectedDay.value) return
  const list = selectedDay.value.activities
  const index = list.findIndex((a) => a._id === id)
  const next = index + direction
  if (index < 0 || next < 0 || next >= list.length) return
  const copy = [...list]
  const [item] = copy.splice(index, 1)
  copy.splice(next, 0, item)
  selectedDay.value.activities = copy
}

function moveToDay(activityId: string, targetDayId: string) {
  if (!selectedDay.value || !targetDayId || targetDayId === selectedDayId.value)
    return

  const from = selectedDay.value
  const index = from.activities.findIndex((a) => a._id === activityId)
  if (index < 0) return

  const target = editDays.value.find((d) => d.id === targetDayId)
  if (!target) return

  const [item] = from.activities.splice(index, 1)
  target.activities.push(item)
  expandedDayClear()
}

function notesText(activity: EditableActivity) {
  return activity.notes?.join('\n') ?? ''
}

function setNotes(activity: EditableActivity, value: string) {
  const lines = value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  activity.notes = lines.length ? lines : undefined
}

function setType(activity: EditableActivity, value: string) {
  activity.type = value ? (value as ActivityType) : undefined
}
</script>

<template>
  <div class="edit">
    <header class="edit__bar">
      <div class="edit__bar-text">
        <p class="edit__eyebrow">Owner edit · mock</p>
        <h1 class="edit__heading">{{ trip.name }} {{ trip.year }}</h1>
      </div>
      <button type="button" class="edit__done" @click="emit('done')">
        Done
      </button>
    </header>

    <p class="edit__banner">
      Changes stay in this browser session only — nothing is saved.
    </p>

    <nav class="edit__days" aria-label="Choose day to edit">
      <button
        v-for="day in editDays"
        :key="day.id"
        type="button"
        class="edit__day-chip"
        :class="{
          'edit__day-chip--active': day.id === selectedDayId,
          'edit__day-chip--birthday': day.theme === 'birthday',
        }"
        @click="selectDay(day.id)"
      >
        {{ dayNumber(day.date) }}
      </button>
    </nav>

    <section v-if="selectedDay" class="edit__panel">
      <header class="edit__day-head">
        <p class="edit__day-date">
          {{ dayNumber(selectedDay.date) }}
          <span>{{ selectedDay.weekday }}</span>
        </p>
        <label class="edit__field">
          <span class="edit__label">Day title</span>
          <input v-model="selectedDay.title" type="text" class="edit__input" />
        </label>
        <label class="edit__field">
          <span class="edit__label">Summary</span>
          <textarea
            v-model="selectedDay.summary"
            class="edit__textarea edit__textarea--summary"
            rows="2"
          />
        </label>
      </header>

      <ul class="edit__list">
        <li
          v-for="(activity, index) in selectedDay.activities"
          :key="activity._id"
          class="edit__row"
          :class="{ 'edit__row--open': expandedId === activity._id }"
        >
          <div class="edit__row-main">
            <span class="edit__grip" aria-hidden="true">
              <GripVertical :size="16" :stroke-width="2" />
            </span>

            <input
              v-model="activity.time"
              type="text"
              class="edit__time"
              placeholder="Time"
              aria-label="Time"
            />

            <input
              v-model="activity.title"
              type="text"
              class="edit__title-input"
              placeholder="What are you doing?"
              aria-label="Activity title"
            />

            <div class="edit__row-actions">
              <button
                type="button"
                class="edit__icon-btn"
                :disabled="index === 0"
                aria-label="Move up"
                @click="moveActivity(activity._id, -1)"
              >
                <ChevronUp :size="16" :stroke-width="2" />
              </button>
              <button
                type="button"
                class="edit__icon-btn"
                :disabled="index === selectedDay.activities.length - 1"
                aria-label="Move down"
                @click="moveActivity(activity._id, 1)"
              >
                <ChevronDown :size="16" :stroke-width="2" />
              </button>
              <button
                type="button"
                class="edit__icon-btn edit__icon-btn--more"
                :aria-expanded="expandedId === activity._id"
                :aria-label="
                  expandedId === activity._id
                    ? 'Hide details'
                    : 'Show details'
                "
                @click="toggleExpand(activity._id)"
              >
                {{ expandedId === activity._id ? 'Less' : 'More' }}
              </button>
            </div>
          </div>

          <div v-if="expandedId === activity._id" class="edit__details">
            <label class="edit__field">
              <span class="edit__label">Place</span>
              <input
                v-model="activity.place"
                type="text"
                class="edit__input"
                placeholder="Neighbourhood, station, venue"
              />
            </label>

            <label class="edit__field">
              <span class="edit__label">Maps link</span>
              <input
                v-model="activity.maps"
                type="url"
                class="edit__input"
                placeholder="Paste Google Maps URL"
              />
            </label>

            <label class="edit__field">
              <span class="edit__label">Booking / link</span>
              <input
                v-model="activity.link"
                type="url"
                class="edit__input"
                placeholder="Tickets, Drive folder, menu…"
              />
            </label>

            <label class="edit__field">
              <span class="edit__label">Type</span>
              <select
                class="edit__select"
                :value="activity.type ?? ''"
                @change="
                  setType(
                    activity,
                    ($event.target as HTMLSelectElement).value,
                  )
                "
              >
                <option value="">None</option>
                <option
                  v-for="[value, meta] in typeOptions"
                  :key="value"
                  :value="value"
                >
                  {{ meta.label }}
                </option>
              </select>
            </label>

            <label class="edit__field">
              <span class="edit__label">Notes · one per line</span>
              <textarea
                class="edit__textarea"
                rows="3"
                :value="notesText(activity)"
                placeholder="Tips, seats, inclusions…"
                @input="
                  setNotes(
                    activity,
                    ($event.target as HTMLTextAreaElement).value,
                  )
                "
              />
            </label>

            <div class="edit__detail-foot">
              <label class="edit__move">
                <span class="edit__label">Move to day</span>
                <select
                  v-model="moveTarget"
                  class="edit__select"
                  @change="
                    moveToDay(
                      activity._id,
                      ($event.target as HTMLSelectElement).value,
                    )
                  "
                >
                  <option value="" disabled>Choose day…</option>
                  <option
                    v-for="day in editDays"
                    :key="day.id"
                    :value="day.id"
                    :disabled="day.id === selectedDayId"
                  >
                    {{ dayNumber(day.date) }} · {{ day.title }}
                  </option>
                </select>
              </label>

              <button
                type="button"
                class="edit__delete"
                @click="removeActivity(activity._id)"
              >
                <Trash2 :size="14" :stroke-width="2" aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>

      <p v-if="!selectedDay.activities.length" class="edit__empty">
        Nothing on this day yet. Add the first thing below.
      </p>

      <form class="edit__quick" @submit.prevent="addActivity">
        <Plus
          class="edit__quick-icon"
          :size="18"
          :stroke-width="2"
          aria-hidden="true"
        />
        <input
          v-model="quickTitle"
          type="text"
          class="edit__quick-input"
          placeholder="Quick add — title only"
          aria-label="Quick add activity"
        />
        <button
          type="submit"
          class="edit__quick-btn"
          :disabled="!quickTitle.trim()"
        >
          Add
        </button>
      </form>
    </section>

    <button type="button" class="edit__close-fab" @click="emit('done')">
      <X :size="18" :stroke-width="2" aria-hidden="true" />
      Back to view
    </button>
  </div>
</template>
