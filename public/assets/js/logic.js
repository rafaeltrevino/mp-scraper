$(function () {

    $(document).on("click", "#importBtn", function (event) {
        event.preventDefault();

        $.get("/scrape", function (req, res) {})
            .then(function (err, res) {
                if (err) throw err;
                location.reload();
            });
    });

    $(".saveBtn").on("click", function (event) {
        let id = $(this).data("id");

        $.post("/person/" + id, {
                saved: true
            })
            .then(function (err, res) {
                if (err) throw err;
                location.reload();
            });
    });

    $(".addNoteBtn").on("click", function (event) {
        event.preventDefault();

        let id = $(this).data("id");
        let currentNote = $(`#${id}`).find("p").text();

        $(this).parent().append(
            `<div class="form-group">
                <label for="exampleFormControlTextarea1">Enter your note</label>
                <textarea class="form-control" id="noteText" rows="3">${currentNote}</textarea>
            </div>`);

        $(this).parent().append(
            `<button type="submit" data-id=${id} class="saveNoteBtn btn btn-primary">Save Note</button>`
        );

        $(this).remove()
    });

    $(document).on("click", ".saveNoteBtn", function (event) {
        event.preventDefault();

        let personId = $(this).data("id");
        let text = $("#noteText").val();

        $.post("/submitNote/person/" + personId, {
                text: text,
                hasNote: true
            })
            .then(function (err, res) {
                if (err) throw err;
                location.reload();
            });
    });

    $(document).on("click", "#clearBtn", function (event) {
        event.preventDefault();

        $.get("/cleardata/", {

            })
            .then(function (err, res) {
                if (err) throw err;
                location.reload();
            })
    })

});
