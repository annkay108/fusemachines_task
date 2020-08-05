import axiosInstance from "../utils/axios";

class File{
    async getListOfFilesByCourseId (courseId: string){
        try {
            const response = await axiosInstance.get(`/file/${courseId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
const fileService = new File();
export default fileService;