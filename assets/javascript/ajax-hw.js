
var topics = ['cat', 'dog', 'monkey', 'fish'];

function showBtn() {

    $(".button-wrapper").empty();
    for (i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.addClass('animal');
        btn.attr("data-animal-name", topics[i]);
        btn.text(topics[i]);
        $(".button-wrapper").append(btn);
    }
}

function displayPic() {
    $(".animal-pic").empty();

    var animal = $(this).attr("data-animal-name");
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var animalChosen = response.data;

            for (var i = 0; i < animalChosen.length; i++) {
                var createImg = $("<img>");
                createImg.attr("src", animalChosen[i].images["480w_still"].url);
                $(".animal-pic").append(createImg);
            }

            console.log(response.data);
        });
}

function addBtn(event) {

    event.preventDefault();
    var addAnimal = $("#animal-input").val().trim();
    // for(var i = 0; i < topics.length; i++) {
    //     if(addAnimal != )
        topics.push(addAnimal);
         showBtn();

    // }

    console.log(topics);
}

showBtn();

console.log(topics);

$(".button-wrapper").on("click",'.animal', displayPic);


 $("#create-btn-animal").on("click", addBtn);
