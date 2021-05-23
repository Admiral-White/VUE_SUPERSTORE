import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrdersModule from "./orders";


Vue.use(Vuex);
let testData = [];

let baseUrl = "http://localhost:3500";
let productsUrl = `${baseUrl}/products`;
let categoriesUrl = `${baseUrl}/categories`;

// this code block is used to generate the dummy product list used as sample.
// this is the data store.
// vuex is used for data management.

for (let i = 1; i <= 12; i++) {
    testData.push({
        id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
        description: `This is Product #${i}`, price: i * 50
    })
}
export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule, orders: OrdersModule  },  // used to implement the cart and order functionality
    state: {
        products: testData,
        categoriesData: [],
        productsTotal: testData.length,
        currentPage: 1,
        pageSize: 4,
        currentCategory: "All"  // used for the category
    },



    getters:{
        productsFilteredByCategory: state => state.products  // used to filter product by category
            .filter(p => state.currentCategory === "All"
                || p.category === state.currentCategory),
        processedProducts: (state, getters) => {           // used for pagination of products
            let index = (state.currentPage -1) * state.pageSize;
            return getters.productsFilteredByCategory
                .slice(index, index + state.pageSize);
        },
        pageCount: (state, getters) =>
            Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),
        // categories: state => ["All",
        //     ...new Set(state.products.map(p => p.category).sort())],
        categories: state => ["All", ...state.categoriesData]



    },

    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },

        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },

        setCurrentCategory(state, category) {     // method to set current category
            state.currentCategory = category;
            state.currentPage = 1;
        },

        setData(state, data) {   // method to set data(product and category data)
            state.products = data.product_data;
            state.productsTotal = data.product_data.length;
            state.categoriesData = data.category_data.sort();
        }
    },
    // Axios is used for HTTP request
    actions: {    // used to get action for the url called and the data given
        async getData(context) {
            let product_data = (await Axios.get(productsUrl)).data;
            let category_data = (await Axios.get(categoriesUrl)).data;
            context.commit("setData", { product_data, category_data} );
        }
    }
})