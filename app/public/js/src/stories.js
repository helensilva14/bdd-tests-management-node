$(document).ready(function () {
    // animations initialization
    new WOW().init();
});

function GetStory(id) {
    $.get("/stories/" + id, {
            story: id
        },
        function (data, status) {
            var json = JSON.parse(decodeURIComponent(data));
            var story = JSON.parse(json);
            $("#id").val(story.idstory);
            $("#edit_description").val(story.description);
        }
    );
    
    // open modal popup
    $("#update_story_modal").modal("show");
}
