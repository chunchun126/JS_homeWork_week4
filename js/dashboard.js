// 個人資訊
const uuid = '8997512c-2d60-40a2-b4a3-5240bcc586d0';
const api = 'https://course-ec-api.hexschool.io/api/';

const app = new Vue({
    el: '#app',
    data: { // 定義資料
        products: [],    // 給陣列 是因為裡面包有許多筆資料（物件）
        tempProduct: {   // 給物件不給陣列 是因為一次只會新增一筆資料
            imageUrl: [],
        },
        pagination: {},
        user: {
            uuid: uuid,
            token: '',
        },
        isNew: false,
    },
    // 生命週期 主要用來取得 token
    // created：Vue實例 建立完成。資料 $data 已可取得，但 $el 屬性尚未被建立。
    created() {
        // 從 cookie 取出 token 並存入 this.user.token 裡
        this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 如果沒有 token 則返回登入頁
        if (this.user.token === '') {
            window.location = 'Login.html';
        }
        // 執行取得全部產品
        this.getAllProducts();
    },
    methods: {
        // 取得 全部產品
        getAllProducts(nowPage = 1) { // 預設參數，預設（page）頁碼在第 1 頁
            const getApi = `${api}${uuid}/admin/ec/products?page=${nowPage}`; // 代入變數（page）為當前頁碼

            // axios 設定說明：https://github.com/axios/axios#config-defaults
            // "Authorization: Bearer {token}"
            // 將 Token 加入到 Headers（需要驗證的 api 需帶上這一串，預設代入 token）
            axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

            axios.get(getApi)
                .then((res) => {
                    console.log(res);
                    // 取得所有商品列表
                    this.products = res.data.data;
                    // 取得分頁資訊
                    this.pagination = res.data.meta.pagination;
                })
                .catch((error) => {
                    console.log('取得失敗', error);
                })
        },
        // 登出
        signOut() {
            // 轉址
            window.location = 'Login.html';
            // 清空 cookie
            document.cookie = `myToken=; expires=; path=/`;
        },
        // 開啟 Modal
        openModal(mode, item) {
            const vm = this;
            switch (mode) {
                case 'new': // 新增（不須物件拷貝）
                    $('#addModal').modal('show');
                    vm.tempProduct = {}; // 給新的參考路徑
                    this.isNew = true;
                    break;
                case 'edit': // 編輯
                    $('#addModal').modal('show');
                    vm.tempProduct = Object.assign({}, item) // 物件拷貝
                    this.isNew = false;
                    // 使用 refs 觸發子元件方法
                    this.$refs.addModal.getProduct(this.tempProduct.id);
                    break;
                case 'dele': // 刪除
                    $('#deleModal').modal('show');
                    vm.tempProduct = Object.assign({}, item) // 物件拷貝                    
                    break;
                default:
                    break;
            }
        },
    },
});
