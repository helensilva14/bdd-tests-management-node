$(document).ready(function () {
    // animations initialization
    new WOW().init();
    
    NewTestPopulateProjects();
});

function GetTest(id) {
    $.get("/tests/" + id, {},
        function (data, status) {
            $("#editForm").attr('action', '/tests/' + id);
            $("#id").val(data[0].idtest);
            $("#edit_description").val(data[0].description);
        }
    );
    
    // open modal popup
    $("#update_test_modal").modal("show");
}

function NewTestPopulateProjects() {
    $.get("/api/projects/", {},
    function (data, status) {
        for (var i = 0; i < data.length; i++) {
            $("#select_test_projects").append('<option value="' + data[i].idproject + '">' + data[i].name + '</option>');
        }
    });
}

function FetchStories(idproject) {
    $.get("/api/projects/" + idproject + "/stories", {},
    function (data, status) {
        $("#select_stories").find('option').remove().end().append('<option>Selecione um projeto...</option>');
        for (var i = 0; i < data.length; i++) {
            $("#select_stories").append('<option value="' + data[i].idstory + '">' + data[i].description + '</option>');
        }
    });
}