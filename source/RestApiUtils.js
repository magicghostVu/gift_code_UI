/**
 * Created by Fresher on 08/08/2017.
 */

import axios from "axios"

function makePromiseAxios(url, data) {
    let pr=axios({
        method: 'post',
        url: url,
        "Content-Type": "application/json",
        data: data
    });
    return pr;
}

let ResApiUtils = {
    testAxios: async function () {
        let pr = axios({
            method: 'post',
            url: "/test-axios",
            "Content-Type": "application/json",
            data: {
                a: 2,
                b: "tiuyhkd"
            }
        });
        let response = await pr;
        //console.log(response);
        return response.data;
    },
    genGiftCodeGeneral: async function (data) {
        let prGenGiftCodeGeneral= makePromiseAxios("/gen-giftcode-general", data);
        let response= await prGenGiftCodeGeneral;
        return response.data;
    }
};

export default ResApiUtils;