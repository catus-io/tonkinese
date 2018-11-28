export function takeBusToShowNav(boolean,eventBus) {
  eventBus.$emit('showNav', boolean)
}
