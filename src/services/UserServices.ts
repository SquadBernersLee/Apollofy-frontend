import axios from "axios"

const baseUrl = 'http://localhost:4000/api/users/account/'


// static async getUser(id: number) {
//     try {
//         const response = await axios.get(baseUrl + id)
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// }

export const getUser = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (err) {
        return null;
    }
};



// export class UserService {
//     static async getUsers() {
//         try {
//             const response = await axios.get(baseUrl)
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     static async getUser(id: number) {
//         try {
//             const response = await axios.get(baseUrl + id)
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     static async postUser(user: string) {
//         try {
//             const response = await axios.post(baseUrl, user)
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     static async patchUser(user: string) {
//         try {
//             const response = await axios.patch(baseUrl, user)
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     static async deleteUser(id: string) {
//         try {
//             const response = await axios.delete(baseUrl + id)
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }