const colors = ["#c0dad9ff", "#B4DEBD", "#FFF7DD", "#FDC9AD", "#c2ebc8ef"];

$(function(){
    const $blogPosts = $(".blog-list li");

    $blogPosts.each(function(){
        const randomColor = colors[Math.floor(Math.random()*colors.length)];
        $(this).css("background-color",randomColor);
    });
});
