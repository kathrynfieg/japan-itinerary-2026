<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowLeft, Eye, EyeOff } from '@lucide/vue'
import logoWhite from '../assets/3-white.png'
import googleMark from '../assets/google.png'

const props = withDefaults(
  defineProps<{
    initialPanel?: 'signup' | 'login'
  }>(),
  { initialPanel: 'signup' },
)

const emit = defineEmits<{
  done: []
  back: []
}>()

const panel = ref<'signup' | 'login'>(props.initialPanel)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const submitted = ref(false)

watch(
  () => props.initialPanel,
  (next) => {
    panel.value = next
    submitted.value = false
  },
)

const isSignup = computed(() => panel.value === 'signup')

function switchPanel(next: 'signup' | 'login') {
  panel.value = next
  submitted.value = false
}

function submit() {
  if (submitted.value) return
  submitted.value = true
  window.setTimeout(() => emit('done'), 900)
}
</script>

<template>
  <div class="signup">
    <aside class="signup__visual" aria-hidden="true">
      <div class="signup__photo"></div>
      <button type="button" class="signup__brand" @click="emit('back')">
        <img class="signup__mark" :src="logoWhite" alt="" width="40" height="40" />
        <span>Daymark</span>
      </button>
      <p class="signup__quote">
        For the days ahead.
        <span>
          Plan lightly, keep everything close, and take Daymark with you.
        </span>
      </p>
    </aside>

    <main class="signup__main">
      <div class="signup__top">
        <button type="button" class="signup__back" @click="emit('back')">
          <ArrowLeft :size="16" :stroke-width="2.25" aria-hidden="true" />
          Back
        </button>
        <p class="signup__switch">
          <template v-if="isSignup">
            Already have an account?
            <button type="button" @click="switchPanel('login')">Log in</button>
          </template>
          <template v-else>
            New here?
            <button type="button" @click="switchPanel('signup')">
              Create an account
            </button>
          </template>
        </p>
      </div>

      <div class="signup__form-wrap">
        <h1 class="signup__title">
          {{ isSignup ? 'Sign up' : 'Log in' }}
        </h1>
        <p class="signup__lede">
          {{
            isSignup
              ? 'Save your trips and open them from any device while you’re away.'
              : 'Pick up your itineraries where you left them.'
          }}
        </p>

        <form class="signup__form" @submit.prevent="submit">
          <label class="signup__field">
            <span class="signup__label">Email</span>
            <input
              v-model="email"
              class="signup__input"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="you@email.com"
            />
          </label>

          <label class="signup__field">
            <span class="signup__label">Password</span>
            <span class="signup__password">
              <input
                v-model="password"
                class="signup__input"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                :autocomplete="isSignup ? 'new-password' : 'current-password'"
                :placeholder="isSignup ? 'At least 8 characters' : 'Your password'"
              />
              <button
                type="button"
                class="signup__reveal"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="showPassword = !showPassword"
              >
                <EyeOff
                  v-if="showPassword"
                  :size="16"
                  :stroke-width="2"
                  aria-hidden="true"
                />
                <Eye v-else :size="16" :stroke-width="2" aria-hidden="true" />
              </button>
            </span>
          </label>

          <label v-if="isSignup" class="signup__field">
            <span class="signup__label">Confirm password</span>
            <span class="signup__password">
              <input
                v-model="confirmPassword"
                class="signup__input"
                :type="showPassword ? 'text' : 'password'"
                name="confirm-password"
                autocomplete="new-password"
                placeholder="Re-enter password"
              />
            </span>
          </label>

          <button type="submit" class="signup__submit">
            {{
              submitted
                ? isSignup
                  ? 'Creating…'
                  : 'Signing in…'
                : isSignup
                  ? 'Create account'
                  : 'Log in'
            }}
          </button>
        </form>

        <div class="signup__split" aria-hidden="true">
          <span>or</span>
        </div>

        <div class="signup__social">
          <button type="button" class="signup__social-btn">
            <img
              class="signup__google"
              :src="googleMark"
              alt=""
              width="18"
              height="18"
            />
            Continue with Google
          </button>
        </div>

        <p v-if="isSignup" class="signup__legal">
          By continuing you agree to Daymark’s Terms and Privacy — mock only.
        </p>
      </div>
    </main>
  </div>
</template>
