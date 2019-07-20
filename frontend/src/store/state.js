export default {
  jwt: sessionStorage.jwt || "",
  logged: sessionStorage.logged === "true" || false,
  permissions: sessionStorage.permissions || "",
  unapprovedAccommodations: [],
  approvedAccommodations: [],
  provinceOptions: [],
  cityOptions: []
};
