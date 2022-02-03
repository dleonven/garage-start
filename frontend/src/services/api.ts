export const getList = async () => {
    try{
        const response = await fetch('http://localhost:3000/')
        console.log("qweqwe: ", JSON.stringify(response))
        return response.json()
    }
    catch(error) {
        console.log("error1: ", error)
    }

}
