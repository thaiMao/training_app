interface State {
  starWars: any
}

export const state = {
  getStarWars(state: State) {
    return state.starWars
  }
}
