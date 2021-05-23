<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-dark text-white">
        <a class="navbar-brand">SPORTS STORE</a>
        <cart-summary />
      </div>
    </div>
    <div class="row">
      <div class="col-3 bg-info p-2">
        <CategoryControls />
      </div>
<!--      <div class="col-9 bg-success p-2">-->
<!--        <h4 class="text-white m-2">Products</h4>-->
<!--      </div>-->
      <div class="col-9 p-2 ">
        <product-list />
      </div>
    </div>

  </div>
</template>

<script>

// ProductList component is used here as a child component to the Store component, same with CategoryControls
import ProductList from "./ProductList";
import CategoryControls from "./CategoryControls";
import CartSummary from "./CartSummary";

export default {
  components: { ProductList, CategoryControls, CartSummary }

}

// export default {
//   name: "Store",
//   components: { ProductList, CategoryControls }

// }
</script>

<style scoped>

</style>