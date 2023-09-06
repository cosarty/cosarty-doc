import { performance } from 'perf_hooks'
import {
  ComponentPublicInstance,
  ObjectDirective,
  Ref,
  computed,
  defineComponent,
  getCurrentScope,
  h,
  onScopeDispose,
  reactive,
  ref,
  toValue,
  watch,
} from 'vue'

type MybeElementRef =
  | Element
  | Ref<HTMLElement | undefined>
  | ComponentPublicInstance
  | undefined
  | Document

const defaultWindow = window

const useSupported = (key: keyof typeof window) =>
  typeof window !== 'undefined' && key in window

const noop = () => {}

const useIntersectionObserver = (
  target: MybeElementRef | MybeElementRef[],

  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit & { immediate?: boolean } = {}
) => {
  const {
    root,
    rootMargin = '0px',
    threshold = 0.1,
    immediate = true,
  } = options

  const isSupported = useSupported('IntersectionObserver')
  const scope = getCurrentScope()
  const unrefElement = (target: MybeElementRef): HTMLElement => {
    const el = toValue(target)
    return (el as ComponentPublicInstance)?.$el ?? el
  }

  const targets = computed(() => {
    const _target = toValue(target)
    return (Array.isArray(_target) ? _target : [_target]).map((el) =>
      unrefElement(el)
    )
  })

  let cleanup = noop
  const isActive = ref(immediate)

  const stopWatch = isSupported
    ? watch(
        () => [targets.value, unrefElement(root!), isActive.value] as const,
        ([targets, root]) => {
          cleanup()
          if (!isActive.value) return

          if (!targets.length) return

          const observer = new IntersectionObserver(callback, {
            root: unrefElement(root),
            rootMargin,
            threshold,
          })

          targets.forEach((el) => el && observer.observe(el))

          cleanup = () => {
            observer.disconnect()
            cleanup = noop
          }
        },
        { immediate, flush: 'post' }
      )
    : noop

  const stop = () => {
    cleanup()
    stopWatch()
    isActive.value = false
  }

  if (scope) {
    onScopeDispose(stop)
  }

  return {
    isSupported,
    isActive,
    pause() {
      cleanup()
      isActive.value = false
    },
    resume() {
      isActive.value = true
    },
    stop,
  }
}

// 自定义指令

type BindingValueFunction = IntersectionObserverCallback

type BindingValueArray = [BindingValueFunction, IntersectionObserverInit]

const vIntersectionObserver: ObjectDirective<
  HTMLElement,
  BindingValueFunction | BindingValueArray
> = {
  mounted(el, binding) {
    if (typeof binding.value === 'function')
      useIntersectionObserver(el, binding.value)
    else useIntersectionObserver(el, ...binding.value)
  },
}

// 组件
const UseElementVisibility = defineComponent({
  name: 'UseElementVisibility',
  props: ['as'],
  setup(props, { slots }) {
    const elementIsVisible = ref(false)
    const target = ref<HTMLElement>()
    const curretnDate = new Date().getTime()
    const nowDate = ref(0)
    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      if (isIntersecting && elementIsVisible.value === false) {
        nowDate.value = new Date().getTime() - curretnDate
        elementIsVisible.value = isIntersecting
      }
    })

    const data = reactive({
      isVisible: elementIsVisible,
      nowDate,
    })

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: target }, slots.default(data))
    }
  },
})

export { useIntersectionObserver, vIntersectionObserver, UseElementVisibility }
