
import Axios from "axios";
let ORDERS_URL = "http://localhost:3500/orders";
export default {
    actions: {
        async storeOrder(context, order) {
            order.cartLines = context.rootState.cart.lines;
            return (await Axios.post(ORDERS_URL, order)).data.id;
        }
    }
}