$(document).ready(function () {
    // animations initialization
    new WOW().init();
    
    PopulateProjects();
});

function GetStory(id) {
    $.get("/stories/" + id, {},
        function (data, status) {
            $("#editForm").attr('action', '/stories/' + id);
            $("#id").val(data[0].idstory);
            $("#edit_description").val(data[0].description);
        }
    );
    
    // open modal popup
    $("#update_story_modal").modal("show");
}

function PopulateProjects() {
    $.get("/api/projects/", {},
    function (data, status) {
        for (var i = 0; i < data.length; i++) {
            $("#select_projects").append('<option value="' + data[i].idproject + '">' + data[i].name + '</option>');
        }
    });
}
