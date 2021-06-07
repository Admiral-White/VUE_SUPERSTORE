// import Vue from "vue";
// import Vuex from "vuex";
// import Axios from "axios";
// import CartModule from "./cart";
// import OrdersModule from "./order";
//
//
// Vue.use(Vuex);
// let testData = [];
//
// let baseUrl = "http://localhost:3500";
// let productsUrl = `${baseUrl}/products`;
// let categoriesUrl = `${baseUrl}/categories`;
//
// // this code block is used to generate the dummy product list used as sample.
// // this is the data store.
// // vuex is used for data management.
//
// for (let i = 1; i <= 12; i++) {
//     testData.push({
//         id: i, name: `Product #${i}`, category: `Category ${i % 3}`,
//         description: `This is Product #${i}`, price: i * 50
//     })
// }
//
//
// // export default new Vuex.Store({
// //     strict: true,
// //     modules: { cart: CartModule, orders: OrdersModule  },  // used to implement the cart and order functionality
// //     state: {
// //         products: testData,
// //         categoriesData: [],
// //         productsTotal: testData.length,
// //         currentPage: 1,
// //         pageSize: 4,
// //         currentCategory: "All"  // used for the category
// //     },
// //
// //
// //
// //     getters:{
// //         productsFilteredByCategory: state => state.products  // used to filter product by category
// //             .filter(p => state.currentCategory === "All"
// //                 || p.category === state.currentCategory),
// //         processedProducts: (state, getters) => {           // used for pagination of products
// //             let index = (state.currentPage -1) * state.pageSize;
// //             return getters.productsFilteredByCategory
// //                 .slice(index, index + state.pageSize);
// //         },
// //         pageCount: (state, getters) =>
// //             Math.ceil(getters.productsFilteredByCategory.length / state.pageSize),
// //         // categories: state => ["All",
// //         //     ...new Set(state.products.map(p => p.category).sort())],
// //         categories: state => ["All", ...state.categoriesData]
// //
// //
// //
// //     },
// //
// //     mutations: {
// //         setCurrentPage(state, page) {
// //             state.currentPage = page;
// //         },
// //
// //         setPageSize(state, size) {
// //             state.pageSize = size;
// //             state.currentPage = 1;
// //         },
// //
// //         setCurrentCategory(state, category) {     // method to set current category
// //             state.currentCategory = category;
// //             state.currentPage = 1;
// //         },
// //
// //         setData(state, data) {   // method to set data(product and category data)
// //             state.products = data.product_data;
// //             state.productsTotal = data.product_data.length;
// //             state.categoriesData = data.category_data.sort();
// //         }
// //     },
// //     // Axios is used for HTTP request
// //     actions: {    // used to get action for the url called and the data given
// //         async getData(context) {
// //             let product_data = (await Axios.get(productsUrl)).data;
// //             let category_data = (await Axios.get(categoriesUrl)).data;
// //             context.commit("setData", { product_data, category_data} );
// //         }
// //     }
// // })
//
// // this is the new code
//
// export default new Vuex.Store({
//     strict: true,
//     modules: { cart: CartModule, orders: OrdersModule },
//     state: {
// //products: [],
//         categoriesData: [],
// //productsTotal: 0,
//         currentPage: 1,
//         pageSize: 4,
//         currentCategory: "All",
//         pages: [],
//         serverPageCount: 0,
//         searchTerm: "",  // use for searched feature
//         showSearch: false
//     },
//     getters: {
// // productsFilteredByCategory: state => state.products
// // .filter(p => state.currentCategory == "All"
// // || p.category == state.currentCategory),
//         processedProducts: (state) => {
//             return state.pages[state.currentPage];
//         },
//         pageCount: (state) => state.serverPageCount,
//         categories: state => ["All", ...state.categoriesData]
//     },
//     mutations: {
//         _setCurrentPage(state, page) {
//             state.currentPage = page;
//         },
//         _setPageSize(state, size) {
//             state.pageSize = size;
//             state.currentPage = 1;
//         },
//         _setCurrentCategory(state, category) {
//             state.currentCategory = category;
//             state.currentPage = 1;
//         },
// // setData(state, data) {
// // state.products = data.pdata;
// // state.productsTotal = data.pdata.length;
// // state.categoriesData = data.cdata.sort();
// // },
//         addPage(state, page) {
//             for (let i = 0; i < page.pageCount; i++) {
//                 Vue.set(state.pages, page.number + i,
//                     page.data.slice(i * state.pageSize,
//                         (i * state.pageSize) + state.pageSize));
//             }
//         },
//         clearPages(state) {
//             state.pages.splice(0, state.pages.length);
//         },
//
//         setCategories(state, categories) {
//             state.categoriesData = categories;
//         },
//         setPageCount(state, count) {
//             state.serverPageCount = Math.ceil(Number(count) / state.pageSize);
//             setShowSearch(state, show) {
//                 state.showSearch = show;
//             },
//             setSearchTerm(state, term) {
//                 state.searchTerm = term;
//                 state.currentPage = 1;
//             },
//         },
//     },
//     actions: {
//         async getData(context) {
//             await context.dispatch("getPage", 2);
//             context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
//         },
//         async getPage(context, getPageCount = 1) {
//             let url = `${productsUrl}?_page=${context.state.currentPage}`
//                 + `&_limit=${context.state.pageSize * getPageCount}`;
//             if (context.state.currentCategory !== "All") {
//                 url += `&category=${context.state.currentCategory}`;
//
//                 if (context.state.searchTerm !== "") {
//                     url += `&q=${context.state.searchTerm}`;
//                 }
//             }
//             let response = await Axios.get(url);
//             context.commit("setPageCount", response.headers["x-total-count"]);
//             context.commit("addPage", { number: context.state.currentPage,
//                 data: response.data, pageCount: getPageCount});
//         },
//         setCurrentPage(context, page) {
//             context.commit("_setCurrentPage", page);
//             if (!context.state.pages[page]) {
//                 context.dispatch("getPage");
//             }
//         },
//         setPageSize(context, size) {
//             context.commit("clearPages");
//             context.commit("_setPageSize", size);
//             context.dispatch("getPage", 2);
//         },
//         setCurrentCategory(context, category) {
//             context.commit("clearPages");
//             context.commit("_setCurrentCategory", category);
//             context.dispatch("getPage", 2);
//
//             search(context, term) {
//                 context.commit("setSearchTerm", term);
//                 context.commit("clearPages");
//                 context.dispatch("getPage", 2);
//             },
//             clearSearchTerm(context) {
//                 context.commit("setSearchTerm", "");
//                 context.commit("clearPages");
//                 context.dispatch("getPage", 2);
//             }
//
//         }
//     }
// })

// new code to enable search in the application

import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrdersModule from "./order";
import AuthModule from "./auth";  // used for authentication feature


Vue.use(Vuex);


let baseUrl = "http://localhost:3500";
let productsUrl = `${baseUrl}/products`;
let categoriesUrl = `${baseUrl}/categories`;

export default new Vuex.Store({
    strict: true,
    modules: { cart: CartModule, orders: OrdersModule, auth: AuthModule },
    state: {
        categoriesData: [],

        currentPage: 1,
        pageSize: 4,
        currentCategory: "All",
        pages: [],
        serverPageCount: 0,
        searchTerm: "",
        showSearch: true  // this made the search functionality come alive
    },
    getters: {
        processedProducts: (state) => {
            return state.pages[state.currentPage];
        },
        pageCount: (state) => state.serverPageCount,
        categories: state => ["All", ...state.categoriesData],
        productById:(state) => (id) => {
            return state.pages[state.currentPage].find(p => p.id === id);
        }
    },
    mutations: {
        _setCurrentPage(state, page) {
            state.currentPage = page;
        },
        _setPageSize(state, size) {
            state.pageSize = size;
            state.currentPage = 1;
        },
        _setCurrentCategory(state, category) {
            state.currentCategory = category;
            state.currentPage = 1;
        },
        addPage(state, page) {
            for (let i = 0; i < page.pageCount; i++) {
                Vue.set(state.pages, page.number + i,
                    page.data.slice(i * state.pageSize,
                        (i * state.pageSize) + state.pageSize));
            }
        },
        clearPages(state) {
            state.pages.splice(0, state.pages.length);
        },
        setCategories(state, categories) {
            state.categoriesData = categories;
        },
        setPageCount(state, count) {
            state.serverPageCount = Math.ceil(Number(count) / state.pageSize);
        },
        setShowSearch(state, show) {
            state.showSearch = show;
        },
        setSearchTerm(state, term) {
            state.searchTerm = term;
            state.currentPage = 1;
        },
        _addProduct(state, product) {
            state.pages[state.currentPage].unshift(product);
        },
        _updateProduct(state, product) {
            let page = state.pages[state.currentPage];
            let index = page.findIndex(p => p.id === product.id);
            Vue.set(page, index, product);
        }
    },

    actions: {
        async getData(context) {
            await context.dispatch("getPage", 2);
            context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
        },

        async addProduct(context, product) {
            let data = (await context.getters.authenticatedAxios.post(productsUrl,
                product)).data;
            product.id = data.id;
            this.commit("_addProduct", product);
        },
        async removeProduct(context, product) {
            await context.getters.authenticatedAxios
                .delete(`${productsUrl}/${product.id}`);
            context.commit("clearPages");
            context.dispatch("getPage", 1);
        },

        async updateProduct(context, product) {
            await context.getters.authenticatedAxios
                .put(`${productsUrl}/${product.id}`, product);
            this.commit("_updateProduct", product);
        },

        async getPage(context, getPageCount = 1) {
            let url = `${productsUrl}?_page=${context.state.currentPage}`
                + `&_limit=${context.state.pageSize * getPageCount}`;
            if (context.state.currentCategory !== "All") {
                url += `&category=${context.state.currentCategory}`;
            }
            if (context.state.searchTerm !== "") {
                url += `&q=${context.state.searchTerm}`;
            }
            let response = await Axios.get(url);
            context.commit("setPageCount", response.headers["x-total-count"]);
            context.commit("addPage", { number: context.state.currentPage,
                data: response.data, pageCount: getPageCount});
        },
        setCurrentPage(context, page) {
            context.commit("_setCurrentPage", page);
            if (!context.state.pages[page]) {
                context.dispatch("getPage");
            }
        },
        setPageSize(context, size) {
            context.commit("clearPages");
            context.commit("_setPageSize", size);
            context.dispatch("getPage", 2);
        },
        setCurrentCategory(context, category) {
            context.commit("clearPages");
            context.commit("_setCurrentCategory", category);
            context.dispatch("getPage", 2);
        },
        search(context, term) {
            context.commit("setSearchTerm", term);
            context.commit("clearPages");
            context.dispatch("getPage", 2);
        },
        clearSearchTerm(context) {
            context.commit("setSearchTerm", "");
            context.commit("clearPages");
            context.dispatch("getPage", 2);
        }
    }
})