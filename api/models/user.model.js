import _ from "lodash";
import { userInfo } from "os";

const findOne = async (_id) => {
    const [rows] = await dbConn.query(`SELECT * FROM user WHERE id='${_id}' LIMIT 1`);
    if(rows.length) return rows[0];
    else return {};
}

const insertOne = async (userInfo) => {
    await dbConn.query(`INSERT INTO user(first_name, last_name, password, username) VALUES ('${userInfo.first_name}', '${userInfo.last_name}', '${userInfo.password}', '${userInfo.username}')`);
}

const updateOne = async (userInfo, _id) => {
    const columns = Object.keys(userInfo);
    const values = Object.values(userInfo);
    values.push(_id);
    const query = "UPDATE user SET " + columns.join(" = ? ,") +" = ? WHERE id = ?";
    await dbConn.query(query, values);
}

export default {
    findOne,
    insertOne,
    updateOne
}