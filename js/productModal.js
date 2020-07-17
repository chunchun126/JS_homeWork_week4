Vue.component('product-modal', {
    template: `<div class="modal fade bd-example-modal-xl" id="addModal" tabindex="-1" role="dialog"
    aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="addModalLabel">新增產品</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="imageUrl">輸入圖片網址</label>
                                    <input id="imageUrl" v-model="tempProduct.imageUrl" type="text"
                                        class="form-control" placeholder="請輸入圖片網址">
                                    <img :src="tempProduct.imageUrl" class="img-fluid mt-3" alt="">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <form>
                                    <div class="form-group">
                                        <label for="inputItemName">產品名稱</label>
                                        <input type="text" class="form-control" id="inputItemName"
                                            placeholder="請輸入產品名稱" v-model="tempProduct.title">
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputCategory">分類</label>
                                            <input type="text" class="form-control" id="inputCategory"
                                                placeholder="請輸入分類" v-model="tempProduct.category">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputUnit">單位</label>
                                            <input type="text" class="form-control" id="inputUnit"
                                                placeholder="請輸入單位" v-model="tempProduct.unit">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="inputOriginPrice">原價</label>
                                            <input type="number" class="form-control" id="inputOriginPrice"
                                                placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="inputPrice">售價</label>
                                            <input type="number" class="form-control" id="inputPrice"
                                                placeholder="請輸入售價" v-model="tempProduct.price">
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <label for="inputDescrip">產品描述</label>
                                        <textarea class="form-control" id="inputDescrip" rows="2"
                                            placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="inputContent">說明內容</label>
                                        <textarea class="form-control" id="inputContent" rows="2"
                                            placeholder="請輸入說明內容" v-model="tempProduct.content"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input formCheck" type="checkbox" id="gridCheck"
                                                v-model="tempProduct.enabled">
                                            <label class="form-check-label" for="gridCheck">
                                                是否啟用
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="m-0">
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">取消</button>
                    <button v-on:click="updateProduct" type="button" class="btn btn-primary btn-sm">確定</button>
                </div>
            </div>
        </div>
    </div>`,
    data() {
        return {
            tempProduct: {}
        }
    },
    props: {
        user: {},
        isNew: true,
    },
    methods: {
        // 取得單一產品
        getProduct(id) {
            const oneApi = `${api}${uuid}/admin/ec/product/${id}`;
            axios.get(oneApi)
                .then((res) => {
                    $('#addModal').modal('show');
                    this.tempProduct = res.data.data
                })
                .catch((error) => { 
                    console.log('失敗', error);
                })
        },

        // （新增/編輯）商品
        updateProduct() {
            let updateApi = `${api}${uuid}/admin/ec/product`; // 因為後面會做修改，故用 let 宣告
            let httpMethod = 'post';
            if (this.isNew === false) { // 如果不是新增 則切換成編輯商品 api
                updateApi = `${api}${uuid}/admin/ec/product/${this.tempProduct.id}`;
            }
            // 將 Token 加入到 Headers（需要驗證的 api 需帶上這一串，預設代入 token）
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios[httpMethod](updateApi, this.tempProduct)
                .then(() => {
                    $('#addModal').modal('hide'); // 關閉 Modal
                    this.$emit('update'); // 透過 emit 向外傳遞並觸發外層方法
                })
                .catch((error) => { 
                    console.log('失敗', error);
                })
        }
    },
});
