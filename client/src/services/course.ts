import axiosInstance from "../utils/axios";

class Course{
    async getAllCourse(){
        try {
            const response = await axiosInstance.get('/course');
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const courseService = new Course();
export default courseService;