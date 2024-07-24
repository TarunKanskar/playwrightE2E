const{test,expect} = require('@playwright/test')
const jsonBody = require('../test_data/post_req_body.json')


test('Query Parameter in Playwright',async ({request})=>{

   const PostAPIRespnse =  await request.post(`/booking`,{

        data:jsonBody
    })


    const PostAPIRespnseBody =  await PostAPIRespnse.json()
    console.log(PostAPIRespnseBody)

    const bookingID = PostAPIRespnseBody.bookingid;
    console.log("bookingid is",bookingID)

    //Validate status code

 expect(PostAPIRespnse.ok()).toBeTruthy()

 expect(PostAPIRespnse.status()).toBe(200)


 //Validate data
 expect(PostAPIRespnseBody.booking.bookingdates).toHaveProperty( "checkin","2018-01-01")
 expect(PostAPIRespnseBody.booking.bookingdates).toHaveProperty( "checkout", "2019-01-01")

 //Nested Data
 expect(PostAPIRespnseBody.booking).toHaveProperty( "firstname", "Tarun1")
 expect(PostAPIRespnseBody.booking).toHaveProperty( "lastname", "Kanskar1")


console.log('=====================================================')

 //Get Data using Booking ID
 const reponseGet = await request.get(`/booking/`,{
    params:{
        "firstname": "Tarun1222",
        "lastname": "Kanskar1222"
    }



})


 const getResponse = await reponseGet.json()
 console.log("get response is ",getResponse)
 console.log(" reponseGet.url is ",  reponseGet.url())

 expect(reponseGet.ok()).toBeTruthy()

 expect(reponseGet.status()).toBe(200)

 console.log(getResponse.totalprice)

 //expect(await reponseGet.json().totalprice).toContainEqual(1000)



})