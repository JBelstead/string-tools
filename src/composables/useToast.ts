import { ref } from 'vue'

const DISMISS_DELAY_MS = 4000

const message = ref('')
const visible = ref(false)
let dismissTimer: ReturnType<typeof setTimeout> | undefined

function show(text: string) {
  message.value = text
  visible.value = true

  if (dismissTimer) clearTimeout(dismissTimer)
  dismissTimer = setTimeout(() => {
    visible.value = false
  }, DISMISS_DELAY_MS)
}

export function useToast() {
  return { message, visible, show }
}
