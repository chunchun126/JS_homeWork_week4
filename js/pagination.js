// 定義一個新的元件
Vue.component('pagination', {
    template: 
    `<nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" :class="{disabled: pages.current_page === 1}">
                <a class="page-link" href="#" aria-label="Previous"
                @click.prevent="getPages(pages.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>

            <li class="page-item"
                v-for="(page, index) in pages.total_pages" :key="index"
                :class="{active: pages.current_page === page}">
                <a class="page-link" href="#"
                    @click.prevent="getPages(page)">{{ page }}
                </a>
            </li>
            
            <li class="page-item" :class="{disabled: pages.current_page === pages.total_pages}">
                <a class="page-link" href="#" aria-label="Next"
                @click.prevent="getPages(pages.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>`,

    // 元件的 data 必須是一個函數
    data() {
        return {}
    },
    // props 由外向內傳遞數據
    // 在 getAllProducts 取得的資料 --> 存至 Vue 實例裡的 Products --> 再傳遞到 props 裡
    props: {
        pages: {}
    },
    methods: {
        getPages(page) { // 把目前點擊的頁數，存入 page 參數裡（點擊第 n 頁，就會代入數字 n）
            // emit 由內向外傳遞數據
            // 將當下點擊的分頁數字，代入外層的 getAllProducts() 並觸發取得全部產品
            this.$emit('emit-pages', page); 
            // this.$emit（'自定義 emit 屬性名稱', 要傳出去的值或參數）
            // $emit 的參數避免和外層的 getAllProducts() 參數名稱一樣，會報錯
            // 屬性名稱 JS 可用駝峰寫法 // HTML 只能用烤肉串寫法 
        }
    }
})
