function showMovies() {
    $('#movie-list').html('')

    $.ajax({
        url: 'http://omdbapi.com/?apikey=3afb022f&s=' + $('#search-input').val(),

        success: function (result) {
            if (result.Response == "True") {
                const movies = result.Search

                let cards = ''
                movies.forEach(m => {
                    cards += showCards(m)
                })
                $('#movie-list').html(cards)

                $('#search-input').val('')

            } else {
                $('#movie-list').html(`<h1>${result.Error}</h1>`)
            }
        }
    })
}

$('#search-button').on('click', function () {
    showMovies()
})

$('#search-input').on('keyup', function (e) {
    if (e.keyCode === 13) {
        showMovies()
    }
})

$('#movie-list').on('click', '.see-details', function () {

    $.ajax({
        url: 'http://omdbapi.com/?apikey=3afb022f&i=' + $(this).data('id'),

        success: m => {
            const movieDetail = showMovieDetail(m)

            $('.modal-body').html(movieDetail)
        }
    })
})

function showCards(m) {
    return `<div class=" col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="card-link see-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${m.imdbID}">See Details</a>
                    </div>
                </div>
            </div>`

}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-5 col-sm-12">
                        <img src="${m.Poster}" >
                    </div>
                
                    <div class="col-md-7 col-sm-12">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>${m.Title}</h3></li>
                            <li class="list-group-item">Released: ${m.Released}</li>
                            <li class="list-group-item">Actors: ${m.Actors}</li>
                            <li class="list-group-item">Plot: ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}