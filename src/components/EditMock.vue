<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import {
  FileText,
  GripVertical,
  Image as ImageIcon,
  ImagePlus,
  Paperclip,
  Plus,
  Search,
  Settings,
  Trash2,
  UserRound,
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
  HERO_STYLES,
  addDays,
  formatRangeLabel,
  weekdayLabel,
  type HeroStyle,
  type SessionTrip,
} from '../lib/createTrip'
import {
  hasUnsplashKey,
  searchUnsplash,
  type UnsplashPhoto,
} from '../lib/unsplash'

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
  home: []
}>()

let idCounter = 0
function nextId(prefix = 'a') {
  idCounter += 1
  return `${prefix}-${idCounter}`
}

function cloneActivityLinks(activity: Activity) {
  if (activity.links?.length) {
    return activity.links.map((link) => ({ ...link }))
  }
  if (activity.link) {
    return [{ label: 'Link', href: activity.link }]
  }
  return undefined
}

function cloneDays(source: Day[]): EditableDay[] {
  return source.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      notes: activity.notes ? [...activity.notes] : undefined,
      links: cloneActivityLinks(activity),
      link: undefined,
      files: activity.files
        ? activity.files.map((file) => ({ ...file }))
        : undefined,
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
    activities: activities.map(({ _id: _unused, ...activity }) => {
      const notes = activity.notes
        ?.map((line) => line.trim())
        .filter(Boolean)
      const links = activity.links
        ?.map((link) => ({
          label: link.label.trim(),
          href: link.href.trim(),
        }))
        .filter((link) => link.label && link.href)

      return {
        ...activity,
        notes: notes?.length ? notes : undefined,
        links: links?.length ? links : undefined,
      }
    }),
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
  groupPhoto: props.trip.groupPhoto ?? '',
  groupPhotoAlt: props.trip.groupPhotoAlt ?? '',
})

const selectedDayId = ref(editDays.value[0]?.id ?? '')
const expandedId = ref<string | null>(null)
const quickTitle = ref('')
const moveTarget = ref('')
const imagesSheetOpen = ref(false)
const coverQuery = ref('')
const coverResults = ref<UnsplashPhoto[]>([])
const coverSearching = ref(false)
const coverError = ref('')
let coverAbort: AbortController | null = null

async function runCoverSearch(query: string) {
  coverAbort?.abort()
  const controller = new AbortController()
  coverAbort = controller
  coverSearching.value = true
  coverError.value = ''

  try {
    const { photos } = await searchUnsplash(query, controller.signal)
    if (controller.signal.aborted) return
    coverResults.value = photos
  } catch (err) {
    if (controller.signal.aborted) return
    coverError.value =
      err instanceof Error ? err.message : 'Couldn’t search Unsplash'
    coverResults.value = []
  } finally {
    if (!controller.signal.aborted) coverSearching.value = false
  }
}

function applyCoverPhoto(photo: UnsplashPhoto) {
  editTrip.value.heroImage = photo.url
  editTrip.value.heroAlt = photo.alt
}

watch(imagesSheetOpen, (open) => {
  if (!open) {
    coverAbort?.abort()
    return
  }
  if (!coverResults.value.length) {
    coverQuery.value = props.trip.name || 'travel'
    void runCoverSearch(coverQuery.value)
  }
})

const selectedDay = computed(
  () => editDays.value.find((d) => d.id === selectedDayId.value) ?? null,
)

const tripStrip = computed(() => {
  const start = editTrip.value.start || props.trip.start
  const end = editTrip.value.end || start
  return {
    name: editTrip.value.name.trim() || props.trip.name,
    range: formatRangeLabel(start, end),
    days: editDays.value.length,
    hero: editTrip.value.heroImage.trim() || props.trip.heroImage,
    heroAlt: editTrip.value.heroAlt.trim() || props.trip.heroAlt,
    photo: editTrip.value.groupPhoto.trim() || undefined,
    photoAlt: editTrip.value.groupPhotoAlt.trim() || 'Group photo',
    isDemo: props.trip.isDemo,
  }
})

const typeOptions = Object.entries(activityTypes) as [
  ActivityType,
  (typeof activityTypes)[ActivityType],
][]

function dayNumber(date: string) {
  return new Date(date + 'T12:00:00').getDate()
}

function monthLabel(date: string) {
  return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', {
    month: 'short',
  })
}

function selectDay(id: string) {
  selectedDayId.value = id
  expandedId.value = null
  quickTitle.value = ''
  moveTarget.value = ''
}

function toggleExpand(id: string) {
  const opening = expandedId.value !== id
  expandedId.value = opening ? id : null
  moveTarget.value = ''

  if (!opening) return

  void nextTick(() => {
    const row = document.querySelector<HTMLElement>('.edit__row--open')
    if (!row) return

    const sticky = document.querySelector<HTMLElement>('.dash__top')
    const offset = (sticky?.getBoundingClientRect().height ?? 56) + 6
    const top = window.scrollY + row.getBoundingClientRect().top - offset

    const root = document.documentElement
    const previous = root.style.scrollBehavior
    root.style.scrollBehavior = 'auto'
    window.scrollTo({ top: Math.max(0, top) })
    root.style.scrollBehavior = previous
  })
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
  // Keep empty lines while typing so Enter works; trim on save
  activity.notes = value.length ? value.split('\n') : undefined
}

function setType(activity: EditableActivity, value: string) {
  activity.type = value ? (value as ActivityType) : undefined
}

function ensureLinks(activity: EditableActivity) {
  if (!activity.links) activity.links = []
  return activity.links
}

function addActivityLink(activity: EditableActivity) {
  ensureLinks(activity).push({ label: '', href: '' })
}

function removeActivityLink(activity: EditableActivity, index: number) {
  if (!activity.links) return
  activity.links.splice(index, 1)
  if (!activity.links.length) activity.links = undefined
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

function clearGroupPhoto() {
  editTrip.value.groupPhoto = ''
  editTrip.value.groupPhotoAlt = ''
}

function buildTrip(): SessionTrip {
  const start = editTrip.value.start || props.trip.start
  const end = editTrip.value.end || start
  const travelers = editTrip.value.travelersRaw
    .split(/[,&]/)
    .map((t) => t.trim())
    .filter(Boolean)
  const groupPhoto = editTrip.value.groupPhoto.trim()
  const groupPhotoAlt = editTrip.value.groupPhotoAlt.trim()

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
    groupPhoto: groupPhoto || undefined,
    groupPhotoAlt: groupPhoto ? groupPhotoAlt || 'Group photo' : undefined,
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
    <header class="dash__top">
      <button
        type="button"
        class="dash__brand-wrap dash__brand-btn"
        @click="emit('home')"
      >
        <p class="dash__brand">Piper Travel</p>
        <p class="dash__brand-sub">Editing · session mock</p>
      </button>
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
        <button type="button" class="edit__done" @click="finish">Done</button>
      </div>
    </header>

    <div
      class="edit__trip-strip"
      :style="{ '--trip-cover': `url(${tripStrip.hero})` }"
      aria-label="Trip being edited"
    >
      <div class="edit__trip-strip-inner">
        <button
          type="button"
          class="edit__trip-portrait edit__trip-portrait--btn"
          aria-label="Edit trip photos"
          @click="imagesSheetOpen = true"
        >
          <img
            v-if="tripStrip.photo"
            :src="tripStrip.photo"
            :alt="tripStrip.photoAlt"
          />
          <span v-else class="edit__trip-portrait-empty" aria-hidden="true">
            <ImagePlus :size="18" :stroke-width="2" />
          </span>
          <span class="edit__trip-portrait-hint">Edit</span>
        </button>
        <div class="edit__trip-copy">
          <p class="edit__trip-kicker">
            Editing
            <span v-if="tripStrip.isDemo" class="edit__trip-badge">Demo</span>
          </p>
          <p class="edit__trip-name">{{ tripStrip.name }}</p>
          <p class="edit__trip-dates">
            {{ tripStrip.range }}
            <span class="edit__trip-sep">·</span>
            {{ tripStrip.days }} day{{ tripStrip.days === 1 ? '' : 's' }}
          </p>
        </div>
      </div>
    </div>

    <main class="edit__main">
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
          :aria-label="`${day.weekday} ${dayNumber(day.date)} ${monthLabel(day.date)}`"
          @click="selectDay(day.id)"
        >
          <span class="edit__day-chip-month">{{ monthLabel(day.date) }}</span>
          <span class="edit__day-chip-num">{{ dayNumber(day.date) }}</span>
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
            v-for="activity in selectedDay.activities"
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

              <div class="edit__field">
                <span class="edit__label">Links</span>
                <ul
                  v-if="activity.links?.length"
                  class="edit__act-links"
                  aria-label="Activity links"
                >
                  <li
                    v-for="(item, linkIndex) in activity.links"
                    :key="`${activity._id}-link-${linkIndex}`"
                    class="edit__act-link"
                  >
                    <input
                      v-model="item.label"
                      type="text"
                      class="edit__input edit__act-link-label"
                      placeholder="Label · Tickets, menu…"
                      aria-label="Link label"
                    />
                    <input
                      v-model="item.href"
                      type="url"
                      class="edit__input edit__act-link-url"
                      placeholder="https://"
                      aria-label="Link URL"
                    />
                    <button
                      type="button"
                      class="edit__icon-btn"
                      aria-label="Remove link"
                      @click="removeActivityLink(activity, linkIndex)"
                    >
                      <X :size="14" :stroke-width="2" aria-hidden="true" />
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  class="edit__add-file"
                  @click="addActivityLink(activity)"
                >
                  <Plus :size="14" :stroke-width="2" aria-hidden="true" />
                  Add link
                </button>
              </div>

              <div class="edit__field">
                <span class="edit__label">Attachments</span>
                <ul
                  v-if="activity.files?.length"
                  class="edit__file-list"
                  aria-label="Attached files"
                >
                  <li
                    v-for="file in activity.files"
                    :key="file.name"
                    class="edit__file"
                  >
                    <span class="edit__file-thumb" aria-hidden="true">
                      <img
                        v-if="file.kind === 'image' && file.thumb"
                        :src="file.thumb"
                        alt=""
                      />
                      <FileText
                        v-else-if="file.kind === 'pdf'"
                        :size="16"
                        :stroke-width="2"
                      />
                      <ImageIcon v-else :size="16" :stroke-width="2" />
                    </span>
                    <span class="edit__file-name">{{ file.name }}</span>
                    <button
                      type="button"
                      class="edit__icon-btn"
                      disabled
                      aria-label="Remove file (coming soon)"
                    >
                      <X :size="14" :stroke-width="2" aria-hidden="true" />
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  class="edit__add-file"
                  disabled
                  aria-disabled="true"
                >
                  <Paperclip :size="14" :stroke-width="2" aria-hidden="true" />
                  Add file
                </button>
                <p class="edit__hint">Photos or PDFs · coming soon</p>
              </div>

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
          Tap the photo in the banner to change cover or group photo.
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

    <div
      v-if="imagesSheetOpen"
      class="img-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="img-sheet-title"
    >
      <button
        type="button"
        class="img-sheet__backdrop"
        aria-label="Close"
        @click="imagesSheetOpen = false"
      />
      <div class="img-sheet__panel">
        <header class="img-sheet__header">
          <div>
            <p class="img-sheet__eyebrow">Personalise</p>
            <h2 id="img-sheet-title" class="img-sheet__title">Trip photos</h2>
          </div>
          <button
            type="button"
            class="img-sheet__close"
            aria-label="Close"
            @click="imagesSheetOpen = false"
          >
            <X :size="16" :stroke-width="2" aria-hidden="true" />
          </button>
        </header>

        <p class="img-sheet__lede">
          Cover shows in the banner and trip view. Group photo is optional.
        </p>

        <section class="img-sheet__section">
          <span class="edit__label">Cover image</span>
          <div
            class="img-sheet__cover-preview"
            :style="{ '--cover-preview': `url(${editTrip.heroImage})` }"
            role="img"
            :aria-label="editTrip.heroAlt || 'Cover preview'"
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
          <form
            class="img-sheet__search"
            @submit.prevent="runCoverSearch(coverQuery)"
          >
            <span class="edit__label">Search Unsplash</span>
            <div class="img-sheet__search-row">
              <Search
                class="img-sheet__search-icon"
                :size="16"
                :stroke-width="2"
                aria-hidden="true"
              />
              <input
                v-model="coverQuery"
                type="search"
                class="edit__input img-sheet__search-input"
                placeholder="Tokyo, beach, mountains…"
                aria-label="Search Unsplash photos"
              />
              <button
                type="submit"
                class="img-sheet__search-btn"
                :disabled="coverSearching"
              >
                {{ coverSearching ? '…' : 'Search' }}
              </button>
            </div>
            <p class="edit__hint">
              <template v-if="hasUnsplashKey()">
                Free photos from Unsplash.
              </template>
              <template v-else>
                Demo catalog — add
                <code>VITE_UNSPLASH_ACCESS_KEY</code> for live Unsplash search.
              </template>
            </p>
          </form>
          <p v-if="coverError" class="img-sheet__error">{{ coverError }}</p>
          <p
            v-else-if="!coverSearching && !coverResults.length"
            class="edit__hint"
          >
            No photos found. Try another place or vibe.
          </p>
          <div
            v-else
            class="img-sheet__results"
            :class="{ 'img-sheet__results--loading': coverSearching }"
            role="listbox"
            aria-label="Cover photo results"
          >
            <button
              v-for="photo in coverResults"
              :key="photo.id"
              type="button"
              role="option"
              class="img-sheet__result"
              :class="{
                'img-sheet__result--on': editTrip.heroImage === photo.url,
              }"
              :style="{ '--result-image': `url(${photo.thumb})` }"
              :aria-label="`Use photo by ${photo.photographer}`"
              :aria-selected="editTrip.heroImage === photo.url"
              @click="applyCoverPhoto(photo)"
            >
              <span class="img-sheet__result-credit">{{
                photo.photographer
              }}</span>
            </button>
          </div>
        </section>

        <section class="img-sheet__section">
          <span class="edit__label">Group photo</span>
          <p class="edit__hint">Shows in the edit banner and trip hero.</p>
          <div class="img-sheet__group-row">
            <div class="img-sheet__group-preview">
              <img
                v-if="editTrip.groupPhoto"
                :src="editTrip.groupPhoto"
                :alt="editTrip.groupPhotoAlt || 'Group photo preview'"
              />
              <span v-else class="img-sheet__group-empty" aria-hidden="true">
                <UserRound :size="22" :stroke-width="1.75" />
              </span>
            </div>
            <div class="img-sheet__group-actions">
              <button
                type="button"
                class="edit__add-file"
                disabled
                aria-disabled="true"
              >
                <ImagePlus :size="14" :stroke-width="2" aria-hidden="true" />
                Upload photo
              </button>
              <button
                v-if="editTrip.groupPhoto"
                type="button"
                class="edit__delete"
                @click="clearGroupPhoto"
              >
                Remove
              </button>
              <p class="edit__hint">Upload coming soon</p>
            </div>
          </div>
        </section>
      </div>
    </div>
    </main>
  </div>
</template>
