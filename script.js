$(document).ready(function () {

    // Start your code from here

    var temas = ["tiger", "lion", "dog", "cat", "panda", "monkey"]
    var listaAnimales = $("#animal-buttons");

    var seccionPostAnimales = $("#animals");

    var endUrl = "https://api.giphy.com/v1/gifs/search";

    var searchAnimal = "dog";

    var apiKey = "roQ0xJpkXHDSBrEWpIoIv6a8lUIqWbDj"

    var limit = 10;



    function cargarBotones() {
        for (let i = 0; i < temas.length; i++) {

            listaAnimales.append(`<button> ${temas[i]} </button>`)

        }
    }

    cargarBotones();

    $("#add-animal").on("click", function (e) {

        e.preventDefault();

        let animal = $("#animal-input").val()

        temas.push(animal)

        listaAnimales.empty()

        cargarBotones()


    });

    seccionPostAnimales.on("click", "img", function (e) {

        var atributo = $(this).attr("data-state")

        if (atributo == "still") {
            $(this).attr("data-state", "animate")
            $(this).attr("src", $(this).attr("data-animate"))
        }
        else {
            $(this).attr("data-state", "still")
            $(this).attr("src", $(this).attr("data-still"))
        }

    });

    listaAnimales.on("click", "button", function (e) {

        seccionPostAnimales.empty()

        searchAnimal = $(this).text()

        $.ajax({
            url: endUrl + "?q=" + searchAnimal + "&api_key=" + apiKey + "&limit=" + limit,
            success: function (respuesta) {

                for (let i = 0; i < limit; i++) {
                    seccionPostAnimales.append(`<div class="animal-item">
                                                    <p>Rating: ${respuesta.data[i].rating}</p>
                                                    <img src = ${respuesta.data[i].images.fixed_height_still.url}
                                                    data-still="${respuesta.data[i].images.fixed_height_still.url}"
                                                    data-animate="${respuesta.data[i].images.fixed_height.url}"
                                                    data-state="still">
                                                </div>`)
                }
            },
            error: function () {
                console.log("error al traer la info de la API.");
            }
        })
    });
});
