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

    async addCourse(newCourse:any){
        try {
            const response = await axiosInstance.post("/course", newCourse)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteCourse(courseId: string){
        try {
            const response = await axiosInstance.delete(`/course/${courseId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const courseService = new Course();
export default courseService;