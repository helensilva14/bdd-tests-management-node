$(document).ready(function () {
    // animations initialization
    new WOW().init();
});

function GetProject(id) {
    $.get("/projects/" + id, {},
        function (data, status) {
            $("#editForm").attr('action', '/projects/' + id);
            $("#id").val(data[0].idproject);
            $("#edit_name").val(data[0].name);
            $("#edit_description").val(data[0].description);
        }
    );
    
    // open modal popup
    $("#update_project_modal").modal("show");
}
