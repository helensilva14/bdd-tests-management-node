$(document).ready(function () {
    // animations initialization
    new WOW().init();
});

function GetStory(id) {
    $.get("ajax/stories/get-story.php", {
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

function DeleteStory(id) {
    var conf = confirm("Você realmente deseja apagar esta estória?");
    if (conf == true) {
        $.post("ajax/stories/delete-story.php", {
                story: id
            },
            function (data, status) {
                location.reload();
            }
        );
    }
}