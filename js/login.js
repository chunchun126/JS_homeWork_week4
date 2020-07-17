// 個人資訊
const uuid = '8997512c-2d60-40a2-b4a3-5240bcc586d0';
const api = 'https://course-ec-api.hexschool.io/api/';

const app = new Vue({
    el: '#app',
    data() {
        // 將資料 return 帶出來
        return {
            // 將資料用物件的形式包起來
            user: {
                email: '',
                password: '',
            },
        }
    },   
    methods: {
        // 登入
        logIn() {
            const postApi = `${api}auth/login`;
            // 向遠端請求 發送資料
            axios.post(postApi, this.user)  //post 代兩個參數（api網址, 要發送的資料）
                // 成功
                .then(function(res){
                    console.log(res);
                    const expired = res.data.expired;
                    const token = res.data.token;
                    // 將 Token 存入 cookie。存取 cookie 參照：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
                    // expires 設置有效時間
                    document.cookie = `myToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
                    // 轉址到 Dashboard
                    window.location = 'Dashboard.html';                   
                })
                // 失敗
                .catch(function(error){
                    console.log('登入失敗', error);
                })
        },
    }
});

// bootstrap 表單驗證
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
