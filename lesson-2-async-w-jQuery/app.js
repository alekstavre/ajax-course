/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        $.ajax({
            url: 'https://api.unsplash.com/search/photos?page=1&query=${searchedForText}',
            headers:{
                Authorization:'Client-ID 0bc6e7701a4fd1ad78ab4d31e402a87cc60f13425f74f22daac56de20db9d989'
            }
        }).done(addImage)
        .fail(function(err){
            requestError(err, 'image');
        })
        });
        function addImage(data){
            let htmlContent = '';
            
            if(data && data.results && data.results[0]) {
                const firstImage = data.results[0];
                htmlContent = `<figure>
                    <img src= "${firstImage.urls.regular}" alt= "${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            }else {
                htmlContent = '<div class="error-no-image">No images available</div>';
            }
    
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }
})();
