const { createApp, ref, computed, watch } = Vue;

const app = createApp({
setup() {
const customers = ref([]);
const searchQuery = ref("");
const selectedCustomer = ref(null);
const mode = ref("none");
const form = ref({
id: null,
name: "",
companyName: "",
email: "",
phone: "",
city: "",
website: ""
});

const filteredCustomers = computed(() => {
const query = searchQuery.value.toLowerCase().trim();
if (!query) {
return customers.value;
}
return customers.value.filter(customer => {
const values = [
customer.name,
customer.companyName,
customer.email,
customer.phone,
customer.city,
customer.website
]
.filter(Boolean)
.map(value => String(value).toLowerCase());
return values.some(value => value.includes(query));
});
});

const formModeTitle = computed(() => {
if (mode.value === "form" && form.value.id) {
return "Kunde bearbeiten";
}
if (mode.value === "form") {
return "Neuen Kunden anlegen";
}
return "";
});

function loadInitialCustomers() {
crmApi.fetchCustomers().then(data => {
customers.value = data;
if (data.length > 0) {
selectedCustomer.value = data[0];
mode.value = "detail";
} else {
selectedCustomer.value = null;
mode.value = "none";
}
});
}

function reloadCustomers() {
loadInitialCustomers();
}

function selectCustomer(customer) {
selectedCustomer.value = customer;
mode.value = "detail";
}

function openCreateForm() {
resetForm();
mode.value = "form";
}

function openEditForm() {
if (!selectedCustomer.value) {
return;
}
form.value = { ...selectedCustomer.value };
mode.value = "form";
}

function resetForm() {
form.value = {
id: null,
name: "",
companyName: "",
email: "",
phone: "",
city: "",
website: ""
};
}

function submitForm() {
if (!form.value.name || !form.value.companyName || !form.value.email) {
return;
}
if (form.value.id) {
const index = customers.value.findIndex(item => item.id === form.value.id);
if (index !== -1) {
customers.value[index] = { ...form.value };
selectedCustomer.value = customers.value[index];
}
} else {
const maxId = customers.value.reduce((max, item) => {
return item.id > max ? item.id : max;
}, 0);
const newId = maxId + 1;
const newCustomer = { ...form.value, id: newId };
customers.value = [...customers.value, newCustomer];
selectedCustomer.value = newCustomer;
}
mode.value = "detail";
}

function cancelForm() {
if (selectedCustomer.value) {
mode.value = "detail";
} else {
mode.value = "none";
}
resetForm();
}

function deleteCustomer() {
if (!selectedCustomer.value) {
return;
}
const idToDelete = selectedCustomer.value.id;
customers.value = customers.value.filter(item => item.id !== idToDelete);
if (customers.value.length > 0) {
selectedCustomer.value = customers.value[0];
mode.value = "detail";
} else {
selectedCustomer.value = null;
mode.value = "none";
}
}

watch(searchQuery, () => {
if (filteredCustomers.value.length > 0) {
if (!selectedCustomer.value) {
selectedCustomer.value = filteredCustomers.value[0];
mode.value = "detail";
}
if (selectedCustomer.value && !filteredCustomers.value.some(item => item.id === selectedCustomer.value.id)) {
selectedCustomer.value = filteredCustomers.value[0];
}
} else {
selectedCustomer.value = null;
if (mode.value === "detail") {
mode.value = "none";
}
}
});

loadInitialCustomers();

return {
customers,
searchQuery,
selectedCustomer,
filteredCustomers,
mode,
form,
formModeTitle,
selectCustomer,
openCreateForm,
openEditForm,
submitForm,
cancelForm,
deleteCustomer,
reloadCustomers
};
}
});

app.mount("#app");
