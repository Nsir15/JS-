//使用jQuery来做

//当HTML结构都加载完成执行函数

jQuery(function ($) {
    let $box = $('.box'),
        $liList= $box.find('ul>li'),
        $divList = $box.children('div');
    // $liList.each(function (index, item) {
    //     $(this).on('click',function () {
    //         // console.log(index);
    //         // $(this).css('color','red')
    //         // $(this).siblings('li').css('color','black')
    //         $(this).addClass('active')
    //             .siblings().removeClass('active')
    //             .parent().nextAll()
    //             .eq(index).addClass('active')
    //             .siblings().removeClass('active');
    //     })
    // })

    // 可以不用遍历，直接添加，jQuery会基于内置的each，给每个li添加事件
    // jQuery内部会自己进行遍历，哪怕只是一个元素的集合
    $liList.click(function () {
        let index = $(this).index();
        $(this).addClass('active')
            .siblings().removeClass('active')
            .parent().nextAll().eq(index).addClass('active')
            .siblings().removeClass('active');
    })
})

