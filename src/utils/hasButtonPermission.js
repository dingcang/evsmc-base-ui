export function hasBtnPermission (permission) {
  let has = this.$store.state.btnPermission
  return has.indexOf(permission) > -1
}

Vue.prototype.hasPerm = hasBtnPermission
