
var animals = ['cat', 'dog', 'giraffe', 'bear'];

function showBtn() {

    $(".button-wrapper").empty();
    for (i = 0; i < animals.length; i++) {
        var btn = $("<button>");
        btn.addClass('animal');
        btn.attr("data-animal-name", animals[i]);
        btn.text(animals[i]);
        $(".button-wrapper").append(btn);
    }
}

function displayPic() {
    $(".animal-pic").empty();

    var thisAnimal = $(this).attr("data-animal-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        thisAnimal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var animal_picture = response.data;
            console.log(animal_picture);
            for (var i = 0; i < animal_picture.length; i++) {

                var createImg = $("<img>");
                var rating = animal_picture[i].rating;

                createImg.attr("src", animal_picture[i].images["480w_still"].url);
                createImg.attr("id", i);
                createImg.addClass('static');
                $(".animal-pic").append(createImg, rating);
                

            }

            $("img").on("click", function () {
                var animate_img = $(this).attr('class');
                console.log(animate_img);
                var img_id = $(this).attr("id");
                // var new_url = $(this).attr("src", animal_picture[img_id].images.downsized_medium.url);

                if (animate_img === "static") {
                    $(this).attr("src", animal_picture[img_id].images.downsized_medium.url);
                    var animate_img = $(this).attr('class', 'dynamic');
                    console.log(animate_img);
                }
                else {
                    animate_img = $(this).attr('class', 'static');
                    $(this).attr("src", animal_picture[img_id].images["480w_still"].url);
                }

            });


        });
}

function addBtn(event) {

    event.preventDefault();
    var addAnimal = $("#animal-input").val().trim();
    animals.push(addAnimal);
    showBtn();
}

showBtn();
$(".button-wrapper").on("click", '.animal', displayPic);
$("#create-btn-animal").on("click", addBtn);

