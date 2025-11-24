const crmApi = {
fetchCustomers() {
return Promise.resolve([
{
id: 1,
name: "Musterkunde Eins",
companyName: "Musterfirma Eins",
email: "muster.eins@example.com",
phone: "123456789",
city: "Musterstadt Eins",
website: "https://muster-eins.example.com"
},
{
id: 2,
name: "Musterkunde Zwei",
companyName: "Musterfirma Zwei",
email: "muster.zwei@example.com",
phone: "123456789",
city: "Musterstadt Zwei",
website: "https://muster-zwei.example.com"
},
{
id: 3,
name: "Musterkunde Drei",
companyName: "Musterfirma Drei",
email: "muster.drei@example.com",
phone: "123456789",
city: "Musterstadt Drei",
website: "https://muster-drei.example.com"
},
{
id: 4,
name: "Musterkunde Vier",
companyName: "Musterfirma Vier",
email: "muster.vier@example.com",
phone: "123456789",
city: "Musterstadt Vier",
website: "https://muster-vier.example.com"
},
{
id: 5,
name: "Musterkunde Fünf",
companyName: "Musterfirma Fünf",
email: "muster.fuenf@example.com",
phone: "123456789",
city: "Musterstadt Fünf",
website: "https://muster-fuenf.example.com"
}
]);
}
};
