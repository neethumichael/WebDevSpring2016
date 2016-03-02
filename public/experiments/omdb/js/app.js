(function()
    {
        $(init);
        var $movieTitleTxt;
        var $searchMovieBtn;
        var $tbody;
        var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE";
        var detailsUrl = "http://www.ombdapi.com/?i=IMDBID";
        var $detailsPoster;
        var $detailsPlot;
        var $detailsActor;
        var $detailsDirector;
        var $detailsTitle;
        function init()
            {
                $movieTitleTxt = $("#movieTitleTxt");
                $searchMovieBtn = $("#searchMovieBtn");
                $searchMovieBtn.click(searchMovie);
                $tbody = $("#searchResults tbody");
                $detailsPoster = $("#detailsPoster");
                $detailsPoster = $("#detailsPlot");
                $detailsPoster = $("#detailsActor");
                $detailsPoster = $("#detailsDirector");
                $detailsTitle = $("#detailsTitle");


            }
        function searchMovie()
        {
            var movieTitle = $movieTitleTxt.val();
           // alert("Search for "+movieTitle);
            var url = searchUrl
                .replace("TITLE", movieTitle)
                .replace("PAGE", 1);
           // alert("URL "+url);
            $.ajax({
                    url: url,
                    success: renderMovieList
                });

        }


        function renderMovieList(response)
        {
            $tbody.empty();
            //console.log(response);
            var totalResults = response.totalResults;
            var movies = response.Search;

            for(var m=0;m<movies.length;m++)
            {
                var movie = movies[m];
                var imdbid = movie.imdbID;
                var poster = movie.Poster;
                var title = movie.Title;
                //console.log(title);
                var $tr = $("<tr>");
                var $td = $("<td>");
                var $img = $("<img>").attr("src",poster)
                                     .addClass("poster")
                                     .attr("id",imdbid)
                                     .click(searchMovieDetails);
                $td.append($img);
                $tr.append($td);

                $td = $("<td>")
                    .append(title);
                $tr.append($td);

                $td = $("<td>")
                    .append(imdbid);
                $tr.append($td);
                $tbody.append($tr);


            }
        }

        function searchMovieDetails(event)
        {
            console.log(event);

            var img = $(event.currentTarget);
            var imdbid = img.attr("id");
            alert(imdbid);
            var url = detailsUrl.replace("IMDBID",imdbid);
            $.ajax({
                url: url,
                success: renderMovieDetails
            });

        }
        function renderMovieDetails(movie)
        {
            console.log(movie);
            var actors = movie.Actors;
            var director = movie.Director;
            var poster = movie.Poster;
            var plot = movie.Plot;
            var title = movie.Title;

            $detailsPoster.attr("src",poster);
            $detailsPlot.html(plot);
            $detailsActor.html(actors);
            $detailsDirector.html(director);
            $detailsTitle.html(title);

        }
    }


)();