const{test,expect} = require('@playwright/test')


test('Create Post API Request Using static req body',async ({request})=>{

   const PostAPIRespnse =  await request.post(`/booking`,{

        data:{
            "firstname": "Tarun1",
            "lastname": "Kanskar1",
            "totalprice": 1000,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "super bowls"
        }
    })


    const PostAPIRespnseBody =  await PostAPIRespnse.json()
    console.log(PostAPIRespnseBody)

    //Validate status code

 expect(PostAPIRespnse.ok()).toBeTruthy()

 expect(PostAPIRespnse.status()).toBe(200)


 //Validate data
 expect(PostAPIRespnseBody.booking.bookingdates).toHaveProperty( "checkin","2018-01-01")
 expect(PostAPIRespnseBody.booking.bookingdates).toHaveProperty( "checkout", "2019-01-01")

 //Nested Data
 expect(PostAPIRespnseBody.booking).toHaveProperty( "firstname", "Tarun1")
 expect(PostAPIRespnseBody.booking).toHaveProperty( "lastname", "Kanskar1")



})