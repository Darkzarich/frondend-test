export default {
props: ['product', 'index'],
data: function () {
	return {
		mode: 1,
		amount: 0
	}
},
template: `
<div id="products_section">
    <div class="products_page pg_0">
        <div class="product product_horizontal">                                
            <span class="product_code">Код: {{Number(product.code)}}</span>
            <div class="product_status_tooltip_container">
                <span class="product_status">Наличие</span>
            </div>                                
            <div class="product_photo">
                <a href="#" class="url--link product__link">
                    <img v-bind:src="productLinkTransform()">
                </a>                                    
            </div>
            <div class="product_description">
                <a href="#" class="product__link">{{product.title}}</a>
            </div>
            <div class="product_tags hidden-sm">
                <p>Могут понадобиться:</p>
                <a href="#" class="url--link" 
                   v-for="tag in assocProductsTransform()">
                   {{tag}}
                </a>
            </div>
            <div class="product_units">
                <div class="unit--wrapper">
                    <div :class="mode == 1 ? 'unit--active' : ''" class="unit--select" 
                    	 v-if="product.unit == 'м. кв.' || product.unitAlt =='м. кв.'"
                    	 @click="changeMode(1)">
                    	 <p class="ng-binding">За м. кв.</p>
                    </div>
                    <div :class="mode == 2 ? 'unit--active' : ''" class="unit--select" 
                    	 v-if="product.unit == 'упак.' || product.unitAlt =='упак.'"
                    	 @click="changeMode(2)">
                    	 <p class="ng-binding">За упаковку</p>
                    </div>
                    <div class="unit--select unit--active" 
                    	 v-if="product.unit == 'шт.' || product.unitAlt =='шт.'">
                    	 <p class="ng-binding">За шт.</p>
                    </div>
                </div>
            </div>
            <p class="product_price_club_card">
                <span class="product_price_club_card_text">По карте<br>клуба</span>
                <span class="goldPrice">{{getPriceGold}}</span>
                <span class="rouble__i black__i">
                    <svg version="1.0" id="rouble__b" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_black"></use>
                    </svg>
                 </span>
            </p>
            <p class="product_price_default">
                <span class="retailPrice">{{getPriceRetail}}</span>
                <span class="rouble__i black__i">
                    <svg version="1.0" id="rouble__g" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="30px" height="22px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rouble_gray"></use>
                    </svg>
                 </span>
            </p>
            <div class="product_price_points">
                <p class="ng-binding">Можно купить за 231,75 балла</p>
            </div>
            <div class="list--unit-padd"></div>
            <div class="list--unit-desc">
                <div class="unit--info">
                    <div class="unit--desc-i"></div>
                    <div class="unit--desc-t">
                        <p>
                        	<template v-if="product.unit == 'шт.'">
                        		Продается штуками
	                        </template>
	                        <template v-else>
	                            <span class="ng-binding">Продается упаковками:</span>
	                            <span class="unit--infoInn">{{product.unitRatio}} {{product.unit}} = {{product.unitRatioAlt.toFixed(2)}} {{product.unitAlt}} </span>
	                        </template>
                        </p>
                    </div>
                </div>
            </div>
            <div class="product__wrapper">
                <div class="product_count_wrapper">
                    <div class="stepper">
                        <input v-model="amount" class="product__count stepper-input" type="text" value="1">
                        <span @click="amount++" class="stepper-arrow up"></span>
                        <span @click="decreaseAmount" class="stepper-arrow down"></span>                                            
                    </div>
                </div>
                <span class="btn btn_cart" v-bind:data-product-id="product.productId" data-url="/cart/" data-product-id="9bf0afd7-5190-11e5-b9a9-00259036a192">
                    <svg class="ic ic_cart">
                       <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
                    </svg>
                    <span class="ng-binding">В корзину</span>
                </span>
            </div>
        </div>
    </div>
</div>
`,
computed: { 
	getPriceRetail: function () {
		switch (this.mode){
			case 1: return this.product.priceRetailAlt.toFixed(2); break;
			case 2: 
			case 3: return this.product.priceRetail.toFixed(2); break;
		}
	},
	getPriceGold: function () {
		switch (this.mode){
			case 1: return this.product.priceGoldAlt.toFixed(2); break;
			case 2: 
			case 3: return this.product.priceGold.toFixed(2); break;
		}
	},	
},
methods: {
	changeMode: function(m) {
		this.mode = m;
	},
	decreaseAmount: function () { 
		if (this.amount) {
			this.amount--;
		}
	},
	productLinkTransform: function () {
		let link = this.product.primaryImageUrl // just to make shorter what is written below
		return link.substring(0,link.lastIndexOf(".")) + '_220x220_1' + link.substring(link.lastIndexOf("."));
	},
	assocProductsTransform: function () {
		return this.product.assocProducts.split(';');
	}
}
}