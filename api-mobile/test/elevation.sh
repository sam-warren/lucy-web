# Request an elevation value
curl -X GET "localhost:3002/api/context/elevation?lon=-125.37806&lat=49.54147" \
--header "Content-Type: application/json" \
--header 'Authorization: Bearer '${1} \
