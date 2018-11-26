import CatalogueItem from './CatalogueItem.js'

/* Had to turn JSON into js file since i'm not using webpack or something
else yet and ES6 does not allow to import JSON directly...
*/
import products from '../../products.js'

export default {
	data: function () {
		return {
			products: products
		}
	},
	components: {
		'CatalogueItem': CatalogueItem
	},
	template: 
`<div>
	<CatalogueItem 
		v-bind:product="product" 
		v-bind:index="index"
		v-bind:key="product.productId"
		v-for="(product, index) in products">
	</CatalogueItem>
</div>`
}