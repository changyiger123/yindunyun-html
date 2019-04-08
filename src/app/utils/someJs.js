import ajax from "./ajax";
function getPrice(nid) {
    return new Promise ((resolve,reject) =>{
        ajax.post('/admin/sConfig/pay/item/price/info', {nid:nid})
        .then(res => {
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    })
}
export {getPrice}
