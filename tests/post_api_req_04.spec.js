const { test, expect } = require('@playwright/test')
const jsonBody = require('../test_data/post_dynamic_req_body.json')
const { DateTime } = require('luxon')

import { stringFormat } from '../utils/common'

test('Create Post API Request Using dynamic JSON file', async ({ request }) => {



   const checkinDate = DateTime.now().toFormat('yyyy-MM-dd')
   const checkOutDate = DateTime.now().plus({day:5}).toFormat('yyyy-MM-dd')
  
   const dynamicReqBody = stringFormat(JSON.stringify(jsonBody),"test Tarun","Test Kanskar","Bumrah",checkinDate,checkOutDate)

   const PostAPIRespnse = await request.post(`/booking`, {

      data: JSON.parse(dynamicReqBody)
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
   expect(PostAPIRespnseBody.booking).toHaveProperty("firstname", "test Tarun")
   expect(PostAPIRespnseBody.booking).toHaveProperty("lastname", "Test Kanskar")



})