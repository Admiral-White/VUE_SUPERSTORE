import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let testData = [];

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
    state: {
        products: testData,
        productsTotal: testData.length,
        currentPage: 1,
        pageSize: 4,
        currentCategory: "All"  // used for the category
    },

    // getters: {
    //     processedProducts: state => {
    //         let index = (state.currentPage -1) * state.pageSize;
    //         return state.products.slice(index, index + state.pageSize);
    //     },
    //     pageCount: state => Math.ceil(state.productsTotal / state.pageSize)
    // },

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
        categories: state => ["All",
            ...new Set(state.products.map(p => p.category).sort())]


    },

    mutations: {
        setCurrentPage(state, page) {
            state.currentPage = page;
        },

        setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },

        setCurrentCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1;
        }
    }
})