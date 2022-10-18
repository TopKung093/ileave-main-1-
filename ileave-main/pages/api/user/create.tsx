import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const AddUser = async (req: any, res: any) => {
    const user = JSON.parse(req?.cookies?.user)
    const result = await axios({
        method: 'post',
        url: `${process.env.BACK_END_API}/adduser`,
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        data: req?.body
    }).catch((err) => {
        console.log("error :", err)
        res.status(500).json({
            success: false,
            data: {},
            message: err
        })
    })
    res.status(200).json({
        success: true,
        data: JSON.parse(result?.data),
    })
}


export default AddUser