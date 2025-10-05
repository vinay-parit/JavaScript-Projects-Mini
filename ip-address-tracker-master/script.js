let p = fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_EHxil6VCkfZZiCV0YJd6Vw3AhG8fa&ipAddress=8.8.8.8"
);

p.then((response)  =>{
    return response.json()
}).then((data) =>{
    console.log("city name:" , data.location.city) 
    console.log("country:", data.location.country)

})