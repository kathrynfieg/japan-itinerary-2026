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
  type Activity,
  type ActivityType,
  type Day,
  type TripLink,
} from '../data/trip'
import {
  HERO_PRESETS,
  HERO_STYLES,
  addDays,
  formatRangeLabel,
  weekdayLabel,
  type HeroStyle,
  type SessionTrip,
} from '../lib/createTrip'

type EditableActivity = Activity & { _id: string }

type EditableDay = Omit<Day, 'activities'> & {
  activities: EditableActivity[]
}

type EditableLink = TripLink & { _id: string }

type EditTab = 'days' | 'trip' | 'links'

const props = defineProps<{
  days: Day[]
  trip: SessionTrip
  links: TripLink[]
}>()

const emit = defineEmits<{
  done: [payload: { trip: SessionTrip; days: Day[]; links: TripLink[] }]
}>()

let idCounter = 0
function nextId(prefix = 'a') {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

function cloneDays(source: Day[]): EditableDay[] {
  return source.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      notes: activity.notes ? [...activity.notes] : undefined,
      _id: nextId(),
    })),
  }))
}

function cloneLinks(source: TripLink[]): EditableLink[] {
  return source.map((link) => ({ ...link, _id: nextId('l') }))
}

function stripDayIds(days: EditableDay[]): Day[] {
  return days.map(({ activities, ...day }) => ({
    ...day,
    activities: activities.map(({ _id: _unused, ...activity }) => activity),
  }))
}

function stripLinkIds(links: EditableLink[]): TripLink[] {
  return links
    .map(({ _id: _unused, ...link }) => link)
    .filter((link) => link.label.trim() && link.href.trim())
}

const tab = ref<EditTab>('days')
const editDays = ref<EditableDay[]>(cloneDays(props.days))
const editLinks = ref<EditableLink[]>(cloneLinks(props.links))
const editTrip = ref({
  name: props.trip.name,
  tagline: props.trip.tagline,
  travelersRaw: props.trip.travelers.join(', '),
  start: props.trip.start,
  end: props.trip.end,
  heroImage: props.trip.heroImage,
  heroAlt: props.trip.heroAlt,
  heroStyle: (props.trip.heroStyle ?? 'full') as HeroStyle,
})

const selectedDayId = ref(editDays.value[0]?.id ?? '')
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

function addDay() {
  const last = editDays.value[editDays.value.length - 1]
  const nextDate = last ? addDays(last.date, 1) : editTrip.value.start
  const n = editDays.value.length + 1
  const day: EditableDay = {
    id: `day-${n}-${nextDate}-${nextId('d')}`,
    date: nextDate,
    weekday: weekdayLabel(nextDate),
    title: `Day ${n}`,
    summary: 'Nothing planned yet.',
    activities: [],
  }
  editDays.value.push(day)
  selectDay(day.id)
  editTrip.value.end = nextDate
}

function removeDay(id: string) {
  if (editDays.value.length <= 1) return
  editDays.value = editDays.value.filter((d) => d.id !== id)
  if (selectedDayId.value === id) {
    selectedDayId.value = editDays.value[0]?.id ?? ''
  }
  const first = editDays.value[0]
  const last = editDays.value[editDays.value.length - 1]
  if (first) editTrip.value.start = first.date
  if (last) editTrip.value.end = last.date
}

function addLink() {
  const link: EditableLink = {
    _id: nextId('l'),
    label: '',
    href: '',
    note: '',
  }
  editLinks.value.push(link)
}

function removeLink(id: string) {
  editLinks.value = editLinks.value.filter((l) => l._id !== id)
}

function applyHeroPreset(url: string, alt: string) {
  editTrip.value.heroImage = url
  editTrip.value.heroAlt = alt
}

function buildTrip(): SessionTrip {
  const start = editTrip.value.start || props.trip.start
  const end = editTrip.value.end || start
  const travelers = editTrip.value.travelersRaw
    .split(/[,&]/)
    .map((t) => t.trim())
    .filter(Boolean)

  return {
    ...props.trip,
    name: editTrip.value.name.trim() || props.trip.name,
    tagline: editTrip.value.tagline.trim(),
    travelers,
    start,
    end,
    year: String(new Date(start + 'T12:00:00').getFullYear()),
    rangeLabel: formatRangeLabel(start, end),
    heroImage: editTrip.value.heroImage.trim() || props.trip.heroImage,
    heroAlt: editTrip.value.heroAlt.trim() || props.trip.heroAlt,
    heroStyle: editTrip.value.heroStyle,
  }
}

function finish() {
  emit('done', {
    trip: buildTrip(),
    days: stripDayIds(editDays.value),
    links: stripLinkIds(editLinks.value),
  })
}
</script>

<template>
  <div class="edit">
    <header class="edit__bar">
      <div class="edit__bar-text">
        <p class="edit__eyebrow">Owner edit · mock</p>
        <h1 class="edit__heading">{{ editTrip.name || trip.name }}</h1>
      </div>
      <button type="button" class="edit__done" @click="finish">Done</button>
    </header>

    <p class="edit__banner">
      Session mock only — Done updates this trip until you refresh.
    </p>

    <div class="edit__tabs" role="tablist" aria-label="Edit sections">
      <button
        type="button"
        role="tab"
        class="edit__tab"
        :class="{ 'edit__tab--on': tab === 'days' }"
        :aria-selected="tab === 'days'"
        @click="tab = 'days'"
      >
        Days
      </button>
      <button
        type="button"
        role="tab"
        class="edit__tab"
        :class="{ 'edit__tab--on': tab === 'trip' }"
        :aria-selected="tab === 'trip'"
        @click="tab = 'trip'"
      >
        Trip
      </button>
      <button
        type="button"
        role="tab"
        class="edit__tab"
        :class="{ 'edit__tab--on': tab === 'links' }"
        :aria-selected="tab === 'links'"
        @click="tab = 'links'"
      >
        Links
      </button>
    </div>

    <!-- Days -->
    <template v-if="tab === 'days'">
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
        <button
          type="button"
          class="edit__day-chip edit__day-chip--add"
          aria-label="Add day"
          @click="addDay"
        >
          <Plus :size="14" :stroke-width="2.5" />
        </button>
      </nav>

      <section v-if="selectedDay" class="edit__panel">
        <header class="edit__day-head">
          <div class="edit__day-date-row">
            <p class="edit__day-date">
              {{ dayNumber(selectedDay.date) }}
              <span>{{ selectedDay.weekday }}</span>
            </p>
            <button
              type="button"
              class="edit__delete edit__delete--day"
              :disabled="editDays.length <= 1"
              @click="removeDay(selectedDay.id)"
            >
              <Trash2 :size="14" :stroke-width="2" aria-hidden="true" />
              Remove day
            </button>
          </div>
          <label class="edit__field">
            <span class="edit__label">Day title</span>
            <input
              v-model="selectedDay.title"
              type="text"
              class="edit__input"
            />
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
    </template>

    <!-- Trip -->
    <section v-else-if="tab === 'trip'" class="edit__panel">
      <label class="edit__field">
        <span class="edit__label">Trip name</span>
        <input v-model="editTrip.name" type="text" class="edit__input" />
      </label>

      <label class="edit__field">
        <span class="edit__label">Tagline</span>
        <textarea
          v-model="editTrip.tagline"
          class="edit__textarea edit__textarea--summary"
          rows="2"
        />
      </label>

      <label class="edit__field">
        <span class="edit__label">Travelers</span>
        <input
          v-model="editTrip.travelersRaw"
          type="text"
          class="edit__input"
          placeholder="Zac, Jess, Kat"
        />
      </label>

      <div class="edit__dates">
        <label class="edit__field">
          <span class="edit__label">Start</span>
          <input v-model="editTrip.start" type="date" class="edit__input" />
        </label>
        <label class="edit__field">
          <span class="edit__label">End</span>
          <input v-model="editTrip.end" type="date" class="edit__input" />
        </label>
      </div>
      <p class="edit__hint">
        Dates update the trip header. Day chips stay as you’ve built them
        unless you add/remove days.
      </p>

      <div class="edit__styles">
        <span class="edit__label">Hero style</span>
        <p class="edit__hint">
          Layout of the trip cover — try a few, hit Done, then check the view.
        </p>
        <div class="edit__style-grid" role="radiogroup" aria-label="Hero style">
          <button
            v-for="style in HERO_STYLES"
            :key="style.id"
            type="button"
            role="radio"
            class="edit__style"
            :class="{ 'edit__style--on': editTrip.heroStyle === style.id }"
            :aria-checked="editTrip.heroStyle === style.id"
            @click="editTrip.heroStyle = style.id"
          >
            <span
              class="edit__style-thumb"
              :class="`edit__style-thumb--${style.id}`"
              :style="{ '--style-thumb': `url(${editTrip.heroImage})` }"
              aria-hidden="true"
            />
            <span class="edit__style-copy">
              <span class="edit__style-label">{{ style.label }}</span>
              <span class="edit__style-blurb">{{ style.blurb }}</span>
            </span>
          </button>
        </div>
      </div>

      <div class="edit__hero">
        <span class="edit__label">Hero photo</span>
        <div
          class="edit__hero-preview"
          :style="{ '--hero-preview': `url(${editTrip.heroImage})` }"
          role="img"
          :aria-label="editTrip.heroAlt || 'Hero preview'"
        />
        <label class="edit__field">
          <span class="edit__label">Image URL</span>
          <input
            v-model="editTrip.heroImage"
            type="url"
            class="edit__input"
            placeholder="Paste an image URL"
          />
        </label>
        <label class="edit__field">
          <span class="edit__label">Alt text</span>
          <input
            v-model="editTrip.heroAlt"
            type="text"
            class="edit__input"
            placeholder="Short description of the photo"
          />
        </label>
        <div class="edit__presets">
          <span class="edit__label">Presets</span>
          <div class="edit__preset-row">
            <button
              v-for="preset in HERO_PRESETS"
              :key="preset.url"
              type="button"
              class="edit__preset"
              :class="{
                'edit__preset--on': editTrip.heroImage === preset.url,
              }"
              :style="{ '--preset-image': `url(${preset.url})` }"
              :aria-label="`Use ${preset.label} hero`"
              @click="applyHeroPreset(preset.url, preset.alt)"
            >
              <span>{{ preset.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Links -->
    <section v-else class="edit__panel">
      <p class="edit__hint">
        Tickets, bookings, and Drive folders — same idea as the Key links
        section on view.
      </p>

      <ul class="edit__link-list">
        <li v-for="link in editLinks" :key="link._id" class="edit__link-card">
          <label class="edit__field">
            <span class="edit__label">Label</span>
            <input
              v-model="link.label"
              type="text"
              class="edit__input"
              placeholder="Shibuya Sky tickets"
            />
          </label>
          <label class="edit__field">
            <span class="edit__label">URL</span>
            <input
              v-model="link.href"
              type="url"
              class="edit__input"
              placeholder="https://…"
            />
          </label>
          <label class="edit__field">
            <span class="edit__label">Note</span>
            <input
              v-model="link.note"
              type="text"
              class="edit__input"
              placeholder="22 July · Drive folder"
            />
          </label>
          <button
            type="button"
            class="edit__delete"
            @click="removeLink(link._id)"
          >
            <Trash2 :size="14" :stroke-width="2" aria-hidden="true" />
            Delete link
          </button>
        </li>
      </ul>

      <p v-if="!editLinks.length" class="edit__empty">No key links yet.</p>

      <button type="button" class="edit__add-link" @click="addLink">
        <Plus :size="16" :stroke-width="2.25" aria-hidden="true" />
        Add link
      </button>
    </section>

    <button type="button" class="edit__close-fab" @click="finish">
      <X :size="18" :stroke-width="2" aria-hidden="true" />
      Back to view
    </button>
  </div>
</template>
