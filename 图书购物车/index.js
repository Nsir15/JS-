const shop = new Vue({
  el:'#shop',
  data:{
    shopList:[
      {
        "name":'代码大全',
        "date":'1980-09-80',
        "price":'54.00',
        "num":'2'
      },
      {
        "name": '深入理解计算机原理',
        "date": '1980-09-80',
        "price": '54.00',
        "num": '2'
      },
      {
        "name": '你不知道的JavaScript',
        "date": '1980-09-80',
        "price": '54.00',
        "num": '2'
      },
      {
        "name": '编译原理',
        "date": '1980-09-80',
        "price": '54.00',
        "num": '2'
      }
    ],
  },
  methods: {
    add(index) {
      console.log('add');

      this.shopList[index].num++;
    },
    sub(index) {
      this.shopList[index].num  === 1? this.deleteItem(index) : this.shopList[index].num--;
    },
    deleteItem(index) {
      this.shopList.splice(index, 1);
    }
  },
});