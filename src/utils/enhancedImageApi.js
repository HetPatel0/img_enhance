import axios from "axios";

const API_KEY="wx7p17sqbctvjc1zu"
const BASE_URL="https://techhk.aoscdn.com/"
export const enhancedImageAPI  =  async (file) =>{
    try {
        const taskID = await uploadImage(file);
        console.log("Image uploded with task id",taskID);

        const enhancedImage = await Pollforfetching(taskID);
        console.log("enhanced image data: ",enhancedImage);

        return enhancedImage;
     
        
    } catch (error) {
        console.log("Error while fetching and uploading image: " ,error.message);
    }

}
const uploadImage = async(file) => {
        const formData = new FormData();
        formData.append('image_file',file);
        
       const {data}=  await axios.post(`${BASE_URL}/api/tasks/visual/scale`,formData ,{
            headers:{
                'Content-Type': "multipart/form-data",
                "X-API-KEY" : API_KEY,

            }
        })
        // "/api/tasks/visual/scale"
        if(!data?.data?.task_id) {
            throw new Error("falied while uploading")
        }
        return data.data.task_id;
};  
const fetchImage = async (taskID) =>{
       //fetch enhanced image
       const {data}=  await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskID}` ,{
        headers:{
            // 'Content-Type': "multipart/form-data",
            "X-API-KEY" : API_KEY,

        }
    })
    if(!data?.data) {
        throw new Error("falied to fetch image due to id not found")
    }

    return data.data;

        // /api/tasks/visual/scale/{task_id}

};

const Pollforfetching = async(taskID,retries=0 )=>{
    const result =  await fetchImage(taskID);

    if (result.state === 4 ) {
        console.log("Processing ... ");
        
        if(retries>=20 ) {
            throw new Error("Max retries reached .pls try agaun later");
            
        }

        await new Promise((resolve)=> setTimeout(resolve,2000))
        return Pollforfetching(taskID,retries+1);
    }

    return result;


}