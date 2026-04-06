const API_URL = "https://69ca679fba5984c44bf31927.mockapi.io/api/v1/phone"

const getDataPhone = async () => {
    // try-catch: bắt lỗi khi chạy code trong try, nếu có lỗi sẽ nhảy vào catch
    // C1: dùng .then() .catch()
    // const response = await axios.get(API_URL)
    //                             .then((res) => {
    //                                 console.log("res", res)
    //                                 console.log("data", res.data)
    //                             })
    //                             .catch((err) => {
    //                                 console.log("err", err)
    //                                 console.log("err.response", err.response.data)
    //                             })
    //                             .finally(() => {
    //                                 // tắt loading spinner
    //                             })
    
    // return response

    // c2: try-catch kết hợp với async-await
    try {
        const response = await axios.get(API_URL)
        console.log("res", response)
        console.log("data", response.data)
        return response
    } catch (error) {
        console.log("err", error.response.data)
    }
}
getDataPhone()