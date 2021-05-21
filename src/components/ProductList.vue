<template>
  <div>
    <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
        <h4>
            {{p.name}}
            <span class="badge badge-pill badge-primary float-right">
              {{ p.price | currency }}
<!--               currency is added with the price.-->
            </span>
        </h4>
        <div class="card-text bg-white p-1">{{ p.description }}
          <!--button feature to enable add to cart functionality-->
          <button class="btn btn-success btn-sm float-right"
                  v-on:click="handleProductAdd(p)">
            Add To Cart
          </button>
        </div>
    </div>
    <page-control/>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import {mapGetters, mapMutations} from "vuex";  // mapMutation added for the cart functionality
import PageControl from "./PageControl";

export default {
  name: "ProductList",
  components: {PageControl},
  computed: {

    // ...mapState(["products"]) -- used before to map the state of products

    ...mapGetters({products: "processedProducts"})
  },

  // the code block below is used to add a currency place holder to the price (using filter to format currency value)
  filters: {
    currency(value) {
      return new Intl.NumberFormat("en-US",
          {style: "currency", currency: "USD"}).format(value);
    }
  },

  methods: {   // method implementing mapMutation declared above
    ...mapMutations({addProduct: "cart/addProduct"}),
    handleProductAdd(product) {
      this.addProduct(product);
      this.$router.push("/cart");
    }
  }
}




</script>


<style scoped>

</style>