const { test, expect } = require('@playwright/test')
const jsonBody = require('../test_data/post_req_body.json')
const { DateTime } = require('luxon')
import { faker } from '@faker-js/faker'


test('Create Post API Request Using dynamic request body', async ({ request }) => {


   const firstname = faker.person.firstName()
   const lastname = faker.person.lastName()
   const totalPrice = faker.number.int(1000)

   const checkinDate = DateTime.now().toFormat('yyyy-MM-dd')
   const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')



   const PostAPIRespnse = await request.post(`/booking`, {

      data: {
         "firstname": firstname,
         "lastname": lastname,
         "totalprice": totalPrice,
         "depositpaid": true,
         "bookingdates": {
             "checkin": checkinDate,
             "checkout": checkOutDate
         },
         "additionalneeds": "super bowls"
     }
   })


   const PostAPIRespnseBody = await PostAPIRespnse.json()
   console.log(PostAPIRespnseBody)

   //Validate status code

   expect(PostAPIRespnse.ok()).toBeTruthy()

   expect(PostAPIRespnse.status()).toBe(200)


   //Validate data
   expect(PostAPIRespnseBody.booking.bookingdates).toHaveProperty("checkin", checkinDate)
   expect(PostAPIRespnseBody.booking.bookingdates).toHaveProperty("checkout", checkOutDate)

   //Nested Data
   expect(PostAPIRespnseBody.booking).toHaveProperty("firstname", firstname)
   expect(PostAPIRespnseBody.booking).toHaveProperty("lastname", lastname)



})