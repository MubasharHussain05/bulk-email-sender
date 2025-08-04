import { ref, reactive } from 'vue'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map()
const toasts = ref([])

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    removeToast(toastId)
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const addToast = (toast) => {
  const newToast = { ...toast, id: genId(), open: true }
  toasts.value = [newToast, ...toasts.value].slice(0, TOAST_LIMIT)
  return newToast
}

const updateToast = (toastId, updates) => {
  toasts.value = toasts.value.map((t) =>
    t.id === toastId ? { ...t, ...updates } : t
  )
}

const dismissToast = (toastId) => {
  if (toastId) {
    addToRemoveQueue(toastId)
  } else {
    toasts.value.forEach((toast) => {
      addToRemoveQueue(toast.id)
    })
  }

  toasts.value = toasts.value.map((t) =>
    t.id === toastId || toastId === undefined
      ? { ...t, open: false }
      : t
  )
}

const removeToast = (toastId) => {
  if (toastId === undefined) {
    toasts.value = []
  } else {
    toasts.value = toasts.value.filter((t) => t.id !== toastId)
  }
}

export function toast(props) {
  const id = genId()
  
  const update = (updates) => updateToast(id, updates)
  const dismiss = () => dismissToast(id)

  const newToast = {
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) dismiss()
    },
  }

  toasts.value = [newToast, ...toasts.value].slice(0, TOAST_LIMIT)

  return {
    id,
    dismiss,
    update,
  }
}

export function useToast() {
  return {
    toasts,
    toast,
    dismiss: dismissToast,
  }
}