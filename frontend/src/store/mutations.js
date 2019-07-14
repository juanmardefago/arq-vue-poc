export default {
  signIn(state, data) {
    state.jwt = data.accessToken;
    state.permissions = data.permissions;
    state.logged = true;
  },
  signout(state) {
    state.jwt = "";
    state.permissions = "";
    state.logged = false;
  },
  setUnapprovedAccommodations(state, accommodations) {
    state.unapprovedAccommodations = accommodations;
  },
  setApprovedAccommodations(state, accommodations) {
    state.approvedAccommodations = accommodations;
  },
  removeAccommodationFromLists(state, accommodation) {
    state.approvedAccommodations.splice(
      state.approvedAccommodations.indexOf(accommodation),
      1
    );
    state.unapprovedAccommodations.splice(
      state.unapprovedAccommodations.indexOf(accommodation),
      1
    );
  }
};
